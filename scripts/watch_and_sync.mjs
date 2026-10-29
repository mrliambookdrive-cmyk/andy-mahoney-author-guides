// scripts/watch_and_sync.mjs
import { execSync } from 'child_process';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://ueinqyzwhiprpsqzabhv.supabase.co';
const API_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlaW5xeXp3aGlwcnBzcXphYmh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2ODI4NTcsImV4cCI6MjEwODI1ODg1N30.QVHEENSMhYEvFtoVso2yVAlH2B5dW63lPT6RT_OhYrM';

async function check() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/books?select=id&limit=1`, {
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    if (res.ok) {
      console.log('✅ "books" table detected! Triggering automatic sync...');
      execSync('node scripts/sync_to_supabase.mjs', { stdio: 'inherit' });
      process.exit(0);
    }
  } catch (e) {}
}

console.log('👀 Waiting for SQL tables to be created in Supabase (polling every 3s)...');
setInterval(check, 3000);
check();
