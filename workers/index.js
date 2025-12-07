// API Router - expense-tracker
// Auto-generated entry point

import auto_categorize_expeHandler from './auto-categorize-expe.js';
import downloadHandler from './download.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }
    
    // Route to handlers
  if (url.pathname === '/api/auto-categorize-expe') return auto_categorize_expeHandler.fetch(request, env);
  if (url.pathname === '/api/download') return downloadHandler.fetch(request, env);
    
    return new Response('Not Found', { status: 404 });
  }
};
