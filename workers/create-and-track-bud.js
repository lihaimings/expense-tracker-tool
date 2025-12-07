addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  const method = request.method;
  const budgetId = url.pathname.split('/').pop();
  const body = await request.json();

  if (method === 'PUT') {
    return updateBudget(budgetId, body);
  } else if (method === 'GET') {
    return getBudget(budgetId);
  } else {
    return new Response('Method Not Allowed', { status: 405 });
  }
}

async function updateBudget(id, data) {
  try {
    // Simulate updating budget in a database
    const updatedBudget = { id, ...data };
    return new Response(JSON.stringify(updatedBudget), { headers: {'Content-Type': 'application/json'} });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

async function getBudget(id) {
  try {
    // Simulate fetching budget from a database
    const budget = { id, amount: 1000, category: 'Food' };
    return new Response(JSON.stringify(budget), { headers: {'Content-Type': 'application/json'} });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

async function addCorsHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, PUT');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}