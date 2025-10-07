#!/usr/bin/env node

/**
 * Simple Todos CLI
 * Fetches todos from JSONPlaceholder and displays them in a table
 * Usage: node index.mjs [--user <id>] [--limit <number>]
 */

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    user: null,
    limit: null
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];

    if (arg === '--user' && nextArg) {
      const userId = parseInt(nextArg, 10);
      if (isNaN(userId) || userId < 1) {
        console.error('Error: --user must be a positive integer');
        process.exit(1);
      }
      options.user = userId;
      i++; // Skip next argument
    } else if (arg === '--limit' && nextArg) {
      const limit = parseInt(nextArg, 10);
      if (isNaN(limit) || limit < 1) {
        console.error('Error: --limit must be a positive integer');
        process.exit(1);
      }
      options.limit = limit;
      i++; // Skip next argument
    } else if (arg.startsWith('--')) {
      console.error(`Error: Unknown option ${arg}`);
      console.error('Usage: node index.mjs [--user <id>] [--limit <number>]');
      process.exit(1);
    }
  }

  return options;
}

// Fetch todos from JSONPlaceholder
async function fetchTodos() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const todos = await response.json();
    return todos;
  } catch (error) {
    console.error('Error fetching todos:', error.message);
    process.exit(1);
  }
}

// Filter and limit todos based on options
function processTodos(todos, options) {
  let filteredTodos = todos;

  // Filter by user if specified
  if (options.user) {
    filteredTodos = filteredTodos.filter(todo => todo.userId === options.user);
  }

  // Limit results if specified
  if (options.limit) {
    filteredTodos = filteredTodos.slice(0, options.limit);
  }

  return filteredTodos;
}

// Display todos in a table
function displayTodos(todos) {
  if (todos.length === 0) {
    console.log('No todos found matching your criteria.');
    return;
  }

  // Format todos for display
  const displayData = todos.map(todo => ({
    id: todo.id,
    userId: todo.userId,
    title: todo.title.length > 50 ? todo.title.substring(0, 47) + '...' : todo.title,
    completed: todo.completed ? '✅' : '❌'
  }));

  console.log(`\n📋 Found ${todos.length} todo(s):\n`);
  console.table(displayData);
}

// Main function
async function main() {
  try {
    const options = parseArgs();
    const todos = await fetchTodos();
    const processedTodos = processTodos(todos, options);
    displayTodos(processedTodos);
  } catch (error) {
    console.error('Unexpected error:', error.message);
    process.exit(1);
  }
}

// Run the CLI
main();
