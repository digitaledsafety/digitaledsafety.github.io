import asyncio
from playwright.async_api import async_playwright
import os
import subprocess
import sys
import socket
import time

def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

async def main():
    if not os.path.isdir("_site"):
        print("Error: _site directory not found. Please run 'bundle exec jekyll build' first.")
        sys.exit(1)

    port = 8000
    while is_port_in_use(port):
        port += 1

    server_url = f"http://localhost:{port}"
    print(f"Starting server on {server_url}...")
    server_process = subprocess.Popen(
        ["python3", "-m", "http.server", str(port), "--directory", "_site"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )

    # Polling for server readiness
    retries = 10
    while retries > 0:
        if is_port_in_use(port):
            break
        time.sleep(0.5)
        retries -= 1

    if retries == 0:
        print("Error: Server failed to start.")
        server_process.terminate()
        sys.exit(1)

    success = True
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()

            # 1. Check Glossaries link from a definition page (if exists)
            print("Checking Glossaries link from /definitions/agi.html...")
            try:
                await page.goto(f"{server_url}/definitions/agi.html")
                glossaries_link = page.locator("a:has-text('Explore')")
                href = await glossaries_link.get_attribute("href")
                if href == "/glossaries":
                    print("Verified: Glossaries link is correct.")
                else:
                    print(f"Error: Glossaries link is '{href}', expected '/glossaries'.")
                    success = False
            except Exception as e:
                print(f"Warning: Could not verify Glossaries link from /definitions/agi.html: {e}")

            # 2. Check a link in the Glossaries grid
            print("Checking a link in the Glossaries grid...")
            try:
                # Add .html as our simple server doesn't handle extensionless URLs
                await page.goto(f"{server_url}/glossaries.html")
                await page.wait_for_selector(".filterable-card", state="attached", timeout=5000)
                # Any card's View button
                view_link = page.locator(".filterable-card a:has-text('View')").first
                card_href = await view_link.get_attribute("href")
                if card_href and card_href.endswith(".html"):
                    print(f"Verified: Card link '{card_href}' has .html extension.")
                else:
                    print(f"Error: Card link '{card_href}' does NOT have .html extension.")
                    success = False
            except Exception as e:
                print(f"Error: Could not verify Glossaries grid: {e}")
                success = False

            # 3. Check Store link in navigation
            print("Checking Store link in navigation...")
            try:
                await page.goto(f"{server_url}/")
                store_link = page.locator("nav#mainNav a:has-text('Store')")
                store_href = await store_link.get_attribute("href")
                if store_href == "/store":
                    print("Verified: Store link is correct.")
                else:
                    print(f"Error: Store link is '{store_href}', expected '/store'.")
                    success = False
            except Exception as e:
                print(f"Error: Could not verify Store link: {e}")
                success = False

            await browser.close()
    finally:
        server_process.terminate()
        server_process.wait()

    if not success:
        sys.exit(1)
    else:
        print("All link verifications passed!")

if __name__ == "__main__":
    asyncio.run(main())
