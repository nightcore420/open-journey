# 📔 PHP Guestbook (JSON, Bootstrap)

Beginner-friendly guestbook: visitors can post messages that immediately appear on the page.  
Data is stored in `guestbook.json` (no database). Styled with **Bootstrap 5**.

## Features
- Name + Message form
- Store/read from `guestbook.json` (auto-created)
- Basic validation + PRG (Post/Redirect/Get) to avoid double submit
- Safe output (`htmlspecialchars`, `nl2br`), newest first

## Requirements
- PHP 7.4+ (works on PHP 8.x)
- Internet access for Bootstrap CDN

## Usage
```bash
php -S localhost:8000
