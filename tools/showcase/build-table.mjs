#!/usr/bin/env node

import { glob } from "glob";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { markdownTable } from "markdown-table";

/**
 * Build showcase table from markdown files
 * Scans showcase/**/ [0 - 9][0 - 9][0 - 9][0 - 9]; /*.md files and generates a markdown table
 */

const SHOWCASE_DIR = "showcase";
const README_PATH = join(SHOWCASE_DIR, "README.md");
const START_MARKER = "<!-- SHOWCASE_TABLE_START -->";
const END_MARKER = "<!-- SHOWCASE_TABLE_END -->";

// Required fields in front-matter
const REQUIRED_FIELDS = ["title", "contributor", "description", "year"];
// const OPTIONAL_FIELDS = ["github", "repo", "demo", "tags", "screenshot"];

/**
 * Validate front-matter data
 */
function validateEntry(data, filePath) {
  const errors = [];

  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (!data[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Validate year is numeric
  if (data.year && typeof data.year !== "number") {
    errors.push(`Year must be a number, got: ${typeof data.year}`);
  }

  // Validate year format (YYYY)
  if (data.year && (!Number.isInteger(data.year) || data.year < 2000 || data.year > 2100)) {
    errors.push(`Year must be a valid 4-digit year (2000-2100), got: ${data.year}`);
  }

  if (errors.length > 0) {
    throw new Error(`Validation failed for ${filePath}:\n${errors.join("\n")}`);
  }

  return true;
}

/**
 * Process a single markdown file
 */
function processFile(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    const { data } = matter(content);

    // Validate the entry
    validateEntry(data, filePath);

    // Get relative path for linking
    const relativePath = filePath.replace(/\\/g, "/");

    // Create project link
    const projectLink = `[${data.title}](${relativePath})`;

    // Create contributor link (with GitHub profile if available)
    let contributorLink = data.contributor;
    if (data.github) {
      contributorLink = `[${data.contributor}](${data.github})`;
    }

    // Truncate description to 100 characters
    const shortDescription =
      data.description.length > 100 ? data.description.substring(0, 97) + "..." : data.description;

    return {
      year: data.year,
      project: projectLink,
      contributor: contributorLink,
      description: shortDescription,
      title: data.title, // For sorting
    };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    throw error;
  }
}

/**
 * Generate the markdown table
 */
function generateTable(entries) {
  // Sort by year (desc) then by title (asc)
  const sortedEntries = entries.sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year; // Descending year
    }
    return a.title.localeCompare(b.title); // Ascending title
  });

  // Create table data
  const tableData = [
    ["Year", "Project", "Contributor", "Short Description"],
    ...sortedEntries.map((entry) => [
      entry.year.toString(),
      entry.project,
      entry.contributor,
      entry.description,
    ]),
  ];

  return markdownTable(tableData, {
    align: ["c", "l", "l", "l"],
  });
}

/**
 * Update README.md with the generated table
 */
function updateReadme(table, entriesCount) {
  let content;

  try {
    content = readFileSync(README_PATH, "utf8");
  } catch (error) {
    // If README doesn't exist, create it with basic content
    content = `# Project Showcase

This directory contains showcase entries for projects contributed by the community.

<!-- SHOWCASE_TABLE_START -->
<!-- SHOWCASE_TABLE_END -->

## How to Contribute

1. Create a new file in \`showcase/YYYY/your-project-name.md\`
2. Follow the template structure
3. Run \`npm run showcase:build\` to update the table
4. Commit your changes
`;
  }

  // Find and replace the table section
  const startIndex = content.indexOf(START_MARKER);
  const endIndex = content.indexOf(END_MARKER);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(
      `Could not find table markers in ${README_PATH}. Please ensure the file contains both ${START_MARKER} and ${END_MARKER}`,
    );
  }

  // Replace the content between markers
  const beforeTable = content.substring(0, startIndex + START_MARKER.length);
  const afterTable = content.substring(endIndex);

  const newContent = beforeTable + "\n\n" + table + "\n\n" + afterTable;

  // Remove trailing spaces and ensure consistent line endings
  const cleanContent = newContent
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");

  writeFileSync(README_PATH, cleanContent, "utf8");
  console.log(`✅ Updated ${README_PATH} with ${entriesCount} showcase entries`);
}

/**
 * Main function
 */
async function main() {
  try {
    console.log("🔍 Scanning showcase files...");

    // Find all markdown files in showcase directories
    const pattern = join(SHOWCASE_DIR, "**", "[0-9][0-9][0-9][0-9]", "*.md").replace(/\\/g, "/");
    const files = await glob(pattern, { ignore: ["**/README.md", "**/template.md"] });

    console.log(`📁 Found ${files.length} showcase files`);

    if (files.length === 0) {
      console.log("⚠️  No showcase files found. Creating empty table...");
      updateReadme(
        "| Year | Project | Contributor | Short Description |\n|------|---------|--------------|-------------------|\n| - | - | - | - |",
      );
      return;
    }

    // Process each file
    const entries = [];
    for (const file of files) {
      console.log(`📄 Processing: ${file}`);
      const entry = processFile(file);
      entries.push(entry);
    }

    console.log(`✅ Processed ${entries.length} entries successfully`);

    // Generate and update table
    const table = generateTable(entries);
    updateReadme(table, entries.length);

    console.log("🎉 Showcase table updated successfully!");
  } catch (error) {
    console.error("❌ Error building showcase table:", error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
