addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  if (url.pathname !== '/api/auto-categorize') {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.headers.get('Origin') !== null) {
    return new Response(JSON.stringify({ error: 'CORS not allowed' }), { status: 403 });
  }

  try {
    const body = await request.json();
    const { transactionType, location } = body;

    if (!transactionType || !location) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Simple categorization logic
    let category;
    if (transactionType === 'expense') {
      if (location.includes('Grocery')) {
        category = 'Food';
      } else if (location.includes('Gas Station')) {
        category = 'Transportation';
      } else {
        category = 'Other';
      }
    } else {
      return new Response(JSON.stringify({ error: 'Invalid transaction type' }), { status: 400 });
    }

    return new Response(JSON.stringify({ category }), { headers: corsHeaders, status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { headers: corsHeaders, status: 500 });
  }
}