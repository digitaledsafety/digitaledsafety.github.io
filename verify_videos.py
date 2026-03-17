import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async def run_server():
        process = await asyncio.create_subprocess_exec(
            "python3", "-m", "http.server", "8000", "--directory", "_site",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        return process

    server_process = await run_server()
    await asyncio.sleep(2)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Use the correct URL mapping for Jekyll
        await page.goto("http://localhost:8000/categories/videos.html")

        await page.wait_for_selector("#card-container .filterable-card", timeout=5000)

        await page.screenshot(path="videos_page.png", full_page=True)

        content = await page.content()
        new_video_title = "Let's play \"Minecraft Education: Ratio Riddles\"!"
        if new_video_title in content:
            print(f"Verified: '{new_video_title}' is present on the page.")
        else:
            print(f"Error: '{new_video_title}' NOT found on the page.")

        cards = await page.query_selector_all(".filterable-card")
        print(f"Total video cards found: {len(cards)}")

        await browser.close()

    server_process.terminate()
    await server_process.wait()

if __name__ == "__main__":
    asyncio.run(main())
