addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const { method } = request

  if (method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      status: 204
    })
  }

  if (method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 405
    })
  }

  try {
    const body = await request.json()
    const { transactionType, location } = body

    if (!transactionType || !location) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400
      })
    }

    let category = ''
    switch (transactionType) {
      case 'Groceries':
        category = 'Food'
        break
      case 'Utilities':
        category = 'Home'
        break
      case 'Gasoline':
        category = 'Transportation'
        break
      default:
        category = 'Other'
    }

    return new Response(JSON.stringify({ category }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    })
  }
}