#!/usr/bin/env node
/**
 * ATDD Content Validation Script
 * Validates that all product MDX files have required fields (price)
 * and blog MDX files have required fields (description, pubDate)
 * 
 * This script should be run before build to ensure ATDD requirements are met.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const REQUIRED_PRODUCT_FIELDS = ['title', 'pain_point', 'core_selling', 'price'];
const REQUIRED_BLOG_FIELDS = ['title', 'description', 'pubDate'];

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  
  const frontmatter = {};
  const lines = match[1].split('\n');
  let currentKey = null;
  let currentValue = [];
  
  for (const line of lines) {
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);
    if (keyMatch) {
      if (currentKey) {
        frontmatter[currentKey] = currentValue.join(':').trim();
      }
      currentKey = keyMatch[1];
      currentValue = [keyMatch[2]];
    } else if (line.match(/^\s+\|/)) {
      // Continuation line (array value)
      currentValue.push(line.trim());
    } else if (currentKey) {
      currentValue.push(line.trim());
    }
  }
  if (currentKey) {
    frontmatter[currentKey] = currentValue.join(':').trim();
  }
  
  return frontmatter;
}

function findMdxFiles(dir, files = []) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      findMdxFiles(fullPath, files);
    } else if (entry.endsWith('.mdx') || entry.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

function validateContent() {
  const docsDir = join(rootDir, 'src', 'content', 'docs');
  const files = findMdxFiles(docsDir);
  
  let hasErrors = false;
  
  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    const frontmatter = parseFrontmatter(content);
    const type = frontmatter.type;
    const relativePath = file.replace(rootDir + '/', '');
    
    if (type === 'product') {
      for (const field of REQUIRED_PRODUCT_FIELDS) {
        if (!frontmatter[field]) {
          console.error(`❌ ATDD ERROR: ${relativePath} is missing required field "${field}" (required for type=product)`);
          hasErrors = true;
        }
      }
    } else if (type === 'blog') {
      for (const field of REQUIRED_BLOG_FIELDS) {
        if (!frontmatter[field]) {
          console.error(`❌ ATDD ERROR: ${relativePath} is missing required field "${field}" (required for type=blog)`);
          hasErrors = true;
        }
      }
    }
  }
  
  if (hasErrors) {
    console.error('\n⚠️  ATDD validation failed. Fix the errors above before building.');
    process.exit(1);
  } else {
    console.log('✅ ATDD content validation passed.');
    process.exit(0);
  }
}

validateContent();
