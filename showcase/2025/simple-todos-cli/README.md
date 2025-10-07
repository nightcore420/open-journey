# Simple Todos CLI (Node.js)

A tiny, dependency-free Node.js CLI that fetches todos from JSONPlaceholder and displays them in a clean table format. Perfect for beginners learning Node.js and the Fetch API.

## Requirements

- Node.js >= 18 (uses native fetch)

## Usage

```bash
# Fetch all todos
node index.mjs

# Fetch todos for a specific user
node index.mjs --user 1

# Limit the number of results
node index.mjs --limit 10

# Combine filters
node index.mjs --user 1 --limit 5
```

## Features

- ✅ No external dependencies
- ✅ Clean table output using `console.table()`
- ✅ Command-line argument parsing
- ✅ Error handling with clear messages
- ✅ Beginner-friendly code structure

## Notes

This project is designed to be simple and educational. It demonstrates:
- Using native Node.js fetch API
- Basic CLI argument parsing
- Error handling
- Working with external APIs
- Clean code organization

Perfect for beginners who want to learn Node.js fundamentals without complex dependencies.
