addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }

  if (request.headers.get('Origin') !== null) {
    request = new Request(request.url, { headers: request.headers })
  }

  try {
    const body = await request.json()
    const category = categorizeExpense(body.transactionType, body.location)
    return new Response(JSON.stringify({ category }), { status: 200, headers: corsHeaders })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400, headers: corsHeaders })
  }
}

function categorizeExpense(transactionType, location) {
  // Simple categorization logic
  if (transactionType === 'Food' && ['New York', 'Los Angeles'].includes(location)) return 'Dining'
  if (transactionType === 'Travel' && ['Paris', 'Tokyo'].includes(location)) return 'Vacation'
  if (transactionType === 'Groceries') return 'Shopping'
  return 'Other'
}