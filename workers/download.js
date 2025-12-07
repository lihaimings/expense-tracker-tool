// Download API - Expense Tracker
// Supports: JSON, CSV, TXT export

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    try {
      const { data, format = 'json', filename = 'export' } = await request.json();
      
      let content, contentType, ext;
      
      switch (format) {
        case 'csv':
          content = convertToCSV(data);
          contentType = 'text/csv';
          ext = 'csv';
          break;
        case 'txt':
          content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
          contentType = 'text/plain';
          ext = 'txt';
          break;
        default:
          content = JSON.stringify(data, null, 2);
          contentType = 'application/json';
          ext = 'json';
      }
      
      return new Response(content, {
        headers: {
          ...corsHeaders,
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${filename}.${ext}"`
        }
      });
      
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};

function convertToCSV(data) {
  if (!Array.isArray(data) || data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(h => JSON.stringify(row[h] ?? '')).join(','));
  return [headers.join(','), ...rows].join('\n');
}
