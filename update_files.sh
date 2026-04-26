for file in _marketplace/*.md; do
  # Check if platform already exists in front matter
  if ! grep -q "^platform:" "$file"; then
    last_line=$(grep -n "^---" "$file" | sed -n '2p' | cut -f1 -d:)

    if [ -n "$last_line" ]; then
      # Create temp file with new content
      head -n $((last_line - 1)) "$file" > "$file.tmp"
      echo "date: 2024-05-22" >> "$file.tmp"
      echo "platform: pwa" >> "$file.tmp"
      echo "layout: marketplace_item" >> "$file.tmp"
      tail -n +$last_line "$file" >> "$file.tmp"
      mv "$file.tmp" "$file"
    fi
  fi
done
