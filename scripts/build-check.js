#!/usr/bin/env node
/**
 * Keyable Tour - Automated Build & Check System
 *
 * Usage: node scripts/build-check.js [command]
 *
 * Commands:
 *   check    - Run all checks (lint, typecheck, build)
 *   dev      - Start development server
 *   build    - Build for production
 *   status   - Show project status
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
/* eslint-enable @typescript-eslint/no-require-imports */

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  log(`\n▶ ${description}...`, 'cyan');
  try {
    execSync(command, { stdio: 'inherit', cwd: process.cwd() });
    log(`✓ ${description} completed`, 'green');
    return true;
  } catch {
    log(`✗ ${description} failed`, 'red');
    return false;
  }
}

function checkEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    log('⚠ .env.local file not found', 'yellow');
    return false;
  }
  log('✓ .env.local file exists', 'green');
  return true;
}

function showStatus() {
  log('\n╔══════════════════════════════════════════════════╗', 'blue');
  log('║       KEYABLE TOUR - PROJECT STATUS               ║', 'blue');
  log('╚══════════════════════════════════════════════════╝', 'blue');

  const tasks = [
    { name: 'Next.js Setup', done: true },
    { name: 'i18n (English/Indonesian)', done: true },
    { name: 'Landing Page', done: true },
    { name: 'Services Pages', done: true },
    { name: 'Inquiry Form', done: true },
    { name: 'FAQ with Schema.org', done: true },
    { name: 'About Page', done: true },
    { name: 'Notices Pages', done: true },
    { name: 'Admin Dashboard', done: true },
    { name: 'API Routes', done: true },
    { name: 'llms.txt for AI', done: true },
    { name: 'SEO Optimization', done: true },
    { name: 'Email Notifications', done: checkEnvFile() },
    { name: 'Database (Supabase)', done: false },
  ];

  log('\n📋 Implementation Status:', 'cyan');
  tasks.forEach(task => {
    const status = task.done ? '✅' : '⬜';
    log(`   ${status} ${task.name}`);
  });

  log('\n📁 Key Files:', 'cyan');
  log('   /en, /id          - Localized pages');
  log('   /admin            - Admin dashboard');
  log('   /api/inquiry      - Form submission API');
  log('   /llms.txt         - AI crawler info');
  log('   /sitemap.xml      - SEO sitemap');

  log('\n🔧 Next Steps:', 'yellow');
  log('   1. Configure Supabase for database');
  log('   2. Set up Gmail app password for email');
  log('   3. Deploy to Vercel');
  log('   4. Connect domain');
}

async function main() {
  const command = process.argv[2] || 'status';

  switch (command) {
    case 'check':
      log('\n🔍 Running project checks...', 'cyan');
      const lintOk = runCommand('npm run lint', 'Linting');
      const buildOk = runCommand('npm run build', 'Production build');

      if (lintOk && buildOk) {
        log('\n✅ All checks passed! Ready for deployment.', 'green');
      } else {
        log('\n❌ Some checks failed. Please fix the issues.', 'red');
        process.exit(1);
      }
      break;

    case 'dev':
      log('\n🚀 Starting development server...', 'cyan');
      runCommand('npm run dev', 'Development server');
      break;

    case 'build':
      log('\n📦 Building for production...', 'cyan');
      runCommand('npm run build', 'Production build');
      break;

    case 'status':
    default:
      showStatus();
      break;
  }
}

main();
