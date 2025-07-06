#!/usr/bin/env node

/**
 * StreamSearch Setup Script
 * Helps users configure API keys and get started
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`
🎬 StreamSearch Setup
=====================

This script will help you configure API keys for real-time streaming data.

APIs supported:
• TMDB (The Movie Database) - Movie/TV metadata [REQUIRED]
• JustWatch - Streaming availability [AUTOMATIC]

Let's get started!
`);

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function setup() {
  try {
    // Check if .env.local already exists
    const envPath = path.join(process.cwd(), '.env.local');
    const envExamplePath = path.join(process.cwd(), '.env.example');
    
    if (fs.existsSync(envPath)) {
      const overwrite = await askQuestion('⚠️  .env.local already exists. Overwrite? (y/N): ');
      if (overwrite.toLowerCase() !== 'y') {
        console.log('Setup cancelled. Existing configuration preserved.');
        rl.close();
        return;
      }
    }

    // Get TMDB API key
    console.log(`
🎭 TMDB API Setup
=================

To get real-time movie and TV show data, you need a TMDB API key.

Steps:
1. Visit: https://www.themoviedb.org/settings/api
2. Create a free account (if you don't have one)
3. Request an API key (instant approval)
4. Copy the API key

`);

    const tmdbKey = await askQuestion('Enter your TMDB API key (or press Enter to skip): ');

    // Create .env.local file
    let envContent = '';
    
    if (fs.existsSync(envExamplePath)) {
      envContent = fs.readFileSync(envExamplePath, 'utf8');
      if (tmdbKey) {
        envContent = envContent.replace('your_tmdb_api_key_here', tmdbKey);
      }
    } else {
      // Fallback if .env.example doesn't exist
      envContent = `# StreamSearch API Configuration
NEXT_PUBLIC_TMDB_API_KEY=${tmdbKey || 'your_tmdb_api_key_here'}
NEXT_PUBLIC_API_RATE_LIMIT=1000
NEXT_PUBLIC_CACHE_DURATION=3600000
NEXT_PUBLIC_SHOW_ATTRIBUTION=true
`;
    }

    fs.writeFileSync(envPath, envContent);

    console.log(`
✅ Configuration saved to .env.local

${tmdbKey ? '🎉 TMDB API configured! You can now use real-time data.' : '⚠️  TMDB API key not provided. Add it later to .env.local'}

Next steps:
1. Restart your development server: npm run dev
2. Open http://localhost:3000
3. Toggle between "Sample Data" and "Live Data (API)"

🔒 Terms of Service Compliance:
• TMDB: Uses official API with proper attribution
• JustWatch: Uses public endpoints with rate limiting
• No web scraping or unauthorized access
• Educational/informational use only

For more information, see API_INTEGRATION.md

Happy streaming! 🍿
`);

  } catch (error) {
    console.error('Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

setup();
