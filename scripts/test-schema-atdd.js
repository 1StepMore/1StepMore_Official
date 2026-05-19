#!/usr/bin/env node
/**
 * ATDD Negative Test Script for Phase 2
 *
 * This script verifies that the ATDD validation system correctly:
 * 1. Blocks build when product MDX is missing required 'price' field
 * 2. Allows build when product MDX has all required fields
 *
 * Usage: node scripts/test-schema-atdd.js
 */

import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const TEST_DIR = join(rootDir, 'src', 'content', 'docs', 'products');

function runBuild() {
  try {
    execSync('npm run build 2>&1', { cwd: rootDir, encoding: 'utf8' });
    return { success: true, output: '' };
  } catch (error) {
    return { success: false, output: error.stdout || error.stderr || '' };
  }
}

function testMissingPriceField() {
  console.log('\n=== Test 1: Missing price field should block build ===');

  const invalidContent = `---
title: ATDD Test Product
type: product
pain_point: test pain
core_selling: test selling
---

# Test
`;

  const testFile = join(TEST_DIR, 'atdd-test-invalid.mdx');

  try {
    // Create invalid MDX
    writeFileSync(testFile, invalidContent);
    console.log('  Created test file with missing price field');

    // Run build
    const result = runBuild();

    if (!result.success && result.output.includes('price')) {
      console.log('  ✅ PASS: Build blocked, error mentions "price"');
      return true;
    } else {
      console.log('  ❌ FAIL: Build did not fail or error does not mention "price"');
      console.log('    Build success:', result.success);
      console.log('    Output includes "price":', result.output.includes('price'));
      return false;
    }
  } finally {
    // Clean up
    try {
      unlinkSync(testFile);
      console.log('  Cleaned up test file');
    } catch (e) {
      // File may not exist
    }
  }
}

function testValidProductPasses() {
  console.log('\n=== Test 2: Valid product should pass build ===');

  // Run build with existing valid files
  const result = runBuild();

  if (result.success) {
    console.log('  ✅ PASS: Valid build succeeded');
    return true;
  } else {
    console.log('  ❌ FAIL: Valid build failed unexpectedly');
    console.log('    Output:', result.output.substring(0, 500));
    return false;
  }
}

function runTests() {
  console.log('========================================');
  console.log('  ATDD Schema Validation Test Suite');
  console.log('========================================');

  let passed = 0;
  let failed = 0;

  // Test 1: Missing price blocks build
  if (testMissingPriceField()) {
    passed++;
  } else {
    failed++;
  }

  // Test 2: Valid product passes
  if (testValidProductPasses()) {
    passed++;
  } else {
    failed++;
  }

  console.log('\n========================================');
  console.log(`  Results: ${passed} passed, ${failed} failed`);
  console.log('========================================');

  if (failed > 0) {
    console.log('\n⚠️  ATDD validation test FAILED');
    process.exit(1);
  } else {
    console.log('\n✅ ATDD validation test PASSED');
    process.exit(0);
  }
}

runTests();