#!/usr/bin/env node

import { glob } from 'glob';
import { readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { markdownTable } from 'markdown-table';

/**
 * Check showcase entries for validation
 * Runs build-table in dry-run mode and validates against current README
 */

const SHOWCASE_DIR = 'showcase';
const README_PATH = join(SHOWCASE_DIR, 'README.md');
const START_MARKER = '<!-- SHOWCASE_TABLE_START -->';
const END_MARKER = '<!-- SHOWCASE_TABLE_END -->';

// Required fields in front-matter
const REQUIRED_FIELDS = ['title', 'contributor', 'description', 'year'];

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
  if (data.year && typeof data.year !== 'number') {
    errors.push(`Year must be a number, got: ${typeof data.year}`);
  }
  
  // Validate year format (YYYY)
  if (data.year && (!Number.isInteger(data.year) || data.year < 2000 || data.year > 2100)) {
    errors.push(`Year must be a valid 4-digit year (2000-2100), got: ${data.year}`);
  }
  
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  
  return { valid: true, errors: [] };
}

/**
 * Process a single markdown file (dry-run)
 */
function processFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    
    // Validate the entry
    const validation = validateEntry(data, filePath);
    if (!validation.valid) {
      return { valid: false, errors: validation.errors, file: filePath };
    }
    
    // Get relative path for linking
    const relativePath = filePath.replace(/\\/g, '/');
    
    // Create project link
    const projectLink = `[${data.title}](${relativePath})`;
    
    // Create contributor link (with GitHub profile if available)
    let contributorLink = data.contributor;
    if (data.github) {
      contributorLink = `[${data.contributor}](${data.github})`;
    }
    
    // Truncate description to 100 characters
    const shortDescription = data.description.length > 100 
      ? data.description.substring(0, 97) + '...' 
      : data.description;
    
    return {
      valid: true,
      year: data.year,
      project: projectLink,
      contributor: contributorLink,
      description: shortDescription,
      title: data.title
    };
  } catch (error) {
    return { 
      valid: false, 
      errors: [`Error processing file: ${error.message}`], 
      file: filePath 
    };
  }
}

/**
 * Generate the markdown table (same as build-table.mjs)
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
    ['Year', 'Project', 'Contributor', 'Short Description'],
    ...sortedEntries.map(entry => [
      entry.year.toString(),
      entry.project,
      entry.contributor,
      entry.description
    ])
  ];
  
  return markdownTable(tableData, {
    align: ['c', 'l', 'l', 'l']
  });
}

/**
 * Extract current table from README
 */
function getCurrentTable() {
  try {
    const content = readFileSync(README_PATH, 'utf8');
    const startIndex = content.indexOf(START_MARKER);
    const endIndex = content.indexOf(END_MARKER);
    
    if (startIndex === -1 || endIndex === -1) {
      return null;
    }
    
    return content.substring(startIndex + START_MARKER.length, endIndex).trim();
  } catch (error) {
    return null;
  }
}

/**
 * Main validation function
 */
async function main() {
  let hasErrors = false;
  const allErrors = [];
  
  try {
    console.log('🔍 Checking showcase files...');
    
    // Find all markdown files in showcase directories
    const pattern = join(SHOWCASE_DIR, '**', '[0-9][0-9][0-9][0-9]', '*.md').replace(/\\/g, '/');
    const files = await glob(pattern, { ignore: ['**/README.md', '**/template.md'] });
    
    console.log(`📁 Found ${files.length} showcase files`);
    
    if (files.length === 0) {
      console.log('⚠️  No showcase files found');
      return;
    }
    
    // Process each file and collect errors
    const validEntries = [];
    for (const file of files) {
      console.log(`📄 Checking: ${file}`);
      const result = processFile(file);
      
      if (!result.valid) {
        hasErrors = true;
        allErrors.push(`❌ ${file}:`);
        result.errors.forEach(error => {
          allErrors.push(`   ${error}`);
        });
        console.error(`❌ ${file}: ${result.errors.join(', ')}`);
      } else {
        validEntries.push(result);
        console.log(`✅ ${file}: OK`);
      }
    }
    
    // Check if table is up to date
    if (validEntries.length > 0) {
      console.log('🔍 Checking if table is up to date...');
      
      const expectedTable = generateTable(validEntries);
      const currentTable = getCurrentTable();
      
      if (!currentTable) {
        hasErrors = true;
        allErrors.push('❌ README.md does not contain table markers or is missing');
        console.error('❌ README.md does not contain table markers or is missing');
      } else if (currentTable !== expectedTable) {
        hasErrors = true;
        allErrors.push('❌ Showcase table is out of date');
        console.error('❌ Showcase table is out of date');
        console.error('   Run `npm run showcase:build` to update the table');
      } else {
        console.log('✅ Table is up to date');
      }
    }
    
    if (hasErrors) {
      console.error('\n❌ Validation failed with the following errors:');
      allErrors.forEach(error => console.error(error));
      console.error('\n💡 To fix these issues:');
      console.error('   1. Fix any validation errors in your showcase files');
      console.error('   2. Run `npm run showcase:build` to regenerate the table');
      console.error('   3. Commit the updated files');
      process.exit(1);
    } else {
      console.log('\n✅ All showcase entries are valid and table is up to date!');
    }
    
  } catch (error) {
    console.error('❌ Error during validation:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
