addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/login' && request.method === 'POST') {
    return loginHandler(request);
  } else if (path === '/session' && request.method === 'GET') {
    return sessionHandler(request);
  } else {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
  }
}

async function loginHandler(request) {
  try {
    const body = await request.json();
    // Simulate user authentication
    if (body.username === 'user' && body.password === 'pass') {
      return new Response(JSON.stringify({ message: 'Login successful', sessionID: '1234567890' }), { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    } else {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
  }
}

async function sessionHandler(request) {
  try {
    const sessionID = request.headers.get('session-id');
    if (sessionID === '1234567890') {
      return new Response(JSON.stringify({ message: 'Session active' }), { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    } else {
      return new Response(JSON.stringify({ error: 'Session not found' }), { status: 401, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
  }
}