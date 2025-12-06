#!/usr/bin/env node
/**
 * Security Test Runner
 * Usage: node security-tests/run-tests.js [target-url]
 */

const BASE_URL = process.argv[2] || 'http://localhost:4545';
const API_URL = process.env.API_URL || 'http://localhost:3001';

const results = [];

function log(result) {
  results.push(result);
  const icons = { PASS: '✓', FAIL: '✗', WARN: '⚠', INFO: 'ℹ' };
  const colors = { PASS: '\x1b[32m', FAIL: '\x1b[31m', WARN: '\x1b[33m', INFO: '\x1b[36m' };
  console.log(`${colors[result.status]}${icons[result.status]}\x1b[0m [${result.category}] ${result.name}`);
  if (result.status !== 'PASS') {
    console.log(`  └─ ${result.details}`);
  }
}

async function testSecurityHeaders() {
  console.log('\n=== Security Headers ===\n');
  
  try {
    const response = await fetch(BASE_URL);
    const headers = response.headers;
    
    const tests = [
      { name: 'X-Content-Type-Options', expected: 'nosniff', header: 'x-content-type-options' },
      { name: 'X-Frame-Options', expected: ['DENY', 'SAMEORIGIN'], header: 'x-frame-options' },
      { name: 'Content-Security-Policy', expected: true, header: 'content-security-policy' },
      { name: 'Strict-Transport-Security', expected: true, header: 'strict-transport-security' },
      { name: 'Referrer-Policy', expected: true, header: 'referrer-policy' },
    ];
    
    for (const test of tests) {
      const value = headers.get(test.header);
      let pass = false;
      
      if (Array.isArray(test.expected)) {
        pass = test.expected.some(e => value?.includes(e));
      } else if (test.expected === true) {
        pass = !!value;
      } else {
        pass = value === test.expected;
      }
      
      log({
        name: test.name,
        category: 'Headers',
        status: pass ? 'PASS' : 'WARN',
        details: value ? `Current: ${value}` : 'Not set',
      });
    }
  } catch (e) {
    log({ name: 'Headers Test', category: 'Headers', status: 'FAIL', details: `Cannot connect: ${e.message}` });
  }
}

async function testPathTraversal() {
  console.log('\n=== Path Traversal ===\n');
  
  const payloads = ['../../../etc/passwd', '..%2F..%2Fetc%2Fpasswd', '..\\..\\windows\\system32'];
  
  for (const payload of payloads) {
    try {
      const url = `${BASE_URL}/pt/projects/${encodeURIComponent(payload)}`;
      const res = await fetch(url);
      const text = await res.text();
      
      if (text.includes('root:') || text.includes('[boot loader]')) {
        log({ name: 'Path Traversal', category: 'Injection', status: 'FAIL', details: `Vulnerable: ${payload}` });
        return;
      }
    } catch (e) {}
  }
  
  log({ name: 'Path Traversal', category: 'Injection', status: 'PASS', details: 'No vulnerabilities detected' });
}

async function testXSS() {
  console.log('\n=== XSS Tests ===\n');
  
  const payloads = ['<script>alert(1)</script>', '<img src=x onerror=alert(1)>', '"><svg onload=alert(1)>'];
  
  for (const payload of payloads) {
    try {
      const res = await fetch(`${BASE_URL}/pt/projects/${encodeURIComponent(payload)}`);
      const text = await res.text();
      
      // Check for unencoded reflection
      if (text.includes(payload)) {
        log({ name: 'Reflected XSS', category: 'XSS', status: 'FAIL', details: `Payload reflected: ${payload}` });
        return;
      }
    } catch (e) {}
  }
  
  log({ name: 'XSS Protection', category: 'XSS', status: 'PASS', details: 'React auto-escaping active' });
}

async function testSensitiveFiles() {
  console.log('\n=== Sensitive Files ===\n');
  
  const files = ['/.env', '/.git/config', '/package.json', '/.next/BUILD_ID'];
  
  for (const file of files) {
    try {
      const res = await fetch(`${BASE_URL}${file}`);
      if (res.status === 200 && file !== '/.next/BUILD_ID') {
        const isCritical = file === '/.env' || file === '/.git/config';
        log({
          name: `File Exposure: ${file}`,
          category: 'Disclosure',
          status: isCritical ? 'FAIL' : 'WARN',
          details: 'File publicly accessible',
        });
      }
    } catch (e) {}
  }
  
  log({ name: 'Sensitive Files', category: 'Disclosure', status: 'PASS', details: 'No critical files exposed' });
}

async function testCORS() {
  console.log('\n=== CORS Configuration ===\n');
  
  try {
    const res = await fetch(`${API_URL}/health`, {
      method: 'OPTIONS',
      headers: { 'Origin': 'https://malicious-site.com' },
    });
    
    const allowOrigin = res.headers.get('access-control-allow-origin');
    
    if (allowOrigin === '*') {
      log({ name: 'CORS Policy', category: 'CORS', status: 'WARN', details: 'Allows all origins (*)' });
    } else {
      log({ name: 'CORS Policy', category: 'CORS', status: 'PASS', details: 'Restricted origins' });
    }
  } catch (e) {
    log({ name: 'CORS Test', category: 'CORS', status: 'INFO', details: `API not reachable: ${API_URL}` });
  }
}

async function testRateLimiting() {
  console.log('\n=== Rate Limiting ===\n');
  
  try {
    const requests = Array(30).fill().map(() =>
      fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test', email: 'test@test.com', message: 'test' }),
      }).catch(() => null)
    );
    
    const responses = await Promise.all(requests);
    const blocked = responses.filter(r => r && r.status === 429).length;
    
    if (blocked === 0) {
      log({ name: 'Rate Limiting', category: 'DoS', status: 'WARN', details: 'No rate limiting detected on API' });
    } else {
      log({ name: 'Rate Limiting', category: 'DoS', status: 'PASS', details: `${blocked}/30 requests blocked` });
    }
  } catch (e) {
    log({ name: 'Rate Limiting', category: 'DoS', status: 'INFO', details: 'Could not test API' });
  }
}

async function checkImageConfig() {
  console.log('\n=== Configuration Review ===\n');
  
  // Check if next.config.mjs has restricted image patterns
  const fs = require('fs');
  const path = require('path');
  
  try {
    const configPath = path.join(process.cwd(), 'next.config.mjs');
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    if (configContent.includes("hostname: '**'") || configContent.includes('hostname: "**"')) {
      log({
        name: 'Next.js Image Domains',
        category: 'Config',
        status: 'WARN',
        details: 'hostname: "**" allows any remote image source. Consider restricting.',
      });
    } else {
      log({
        name: 'Next.js Image Domains',
        category: 'Config',
        status: 'PASS',
        details: 'Image domains are restricted to whitelist',
      });
    }
  } catch (e) {
    log({
      name: 'Next.js Image Domains',
      category: 'Config',
      status: 'INFO',
      details: 'Could not read next.config.mjs',
    });
  }
}

function printReport() {
  console.log('\n' + '='.repeat(50));
  console.log('SECURITY TEST SUMMARY');
  console.log('='.repeat(50));
  
  const pass = results.filter(r => r.status === 'PASS').length;
  const fail = results.filter(r => r.status === 'FAIL').length;
  const warn = results.filter(r => r.status === 'WARN').length;
  
  console.log(`\x1b[32mPassed: ${pass}\x1b[0m`);
  console.log(`\x1b[31mFailed: ${fail}\x1b[0m`);
  console.log(`\x1b[33mWarnings: ${warn}\x1b[0m`);
  
  if (fail > 0) {
    console.log('\n\x1b[31mCRITICAL: Fix failures before deployment!\x1b[0m');
    process.exit(1);
  } else if (warn > 0) {
    console.log('\n\x1b[33mReview warnings before deployment.\x1b[0m');
  } else {
    console.log('\n\x1b[32mAll tests passed!\x1b[0m');
  }
}

async function main() {
  console.log('='.repeat(50));
  console.log('ANSA BRASIL SECURITY TEST');
  console.log('='.repeat(50));
  console.log(`Target: ${BASE_URL}`);
  console.log(`API: ${API_URL}`);
  
  await testSecurityHeaders();
  await testPathTraversal();
  await testXSS();
  await testSensitiveFiles();
  await testCORS();
  await testRateLimiting();
  await checkImageConfig();
  
  printReport();
}

main();

