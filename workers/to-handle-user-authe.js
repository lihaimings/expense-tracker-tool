addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname.slice(1).split('/')

  if (path[0] === 'login') {
    return await loginHandler(request, path)
  } else if (path[0] === 'logout') {
    return await logoutHandler(request, path)
  } else if (path[0] === 'session') {
    return await sessionHandler(request, path)
  } else {
    return new Response(JSON.stringify({ error: 'Not Found' }), { status: 404 })
  }
}

async function loginHandler(request, path) {
  try {
    const data = await request.json()
    // Validate and authenticate user
    if (data.username && data.password) {
      // Generate session token
      const token = generateToken(data.username)
      return new Response(JSON.stringify({ token }), { status: 200 })
    } else {
      throw new Error('Invalid credentials')
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 401 })
  }
}

async function logoutHandler(request, path) {
  try {
    // Invalidate session token
    const token = request.headers.get('Authorization')?.split(' ')[1]
    if (token) {
      invalidateToken(token)
      return new Response(JSON.stringify({ message: 'Logged out' }), { status: 200 })
    } else {
      throw new Error('No token provided')
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 401 })
  }
}

async function sessionHandler(request, path) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1]
    if (token) {
      // Validate session token
      const user = validateToken(token)
      if (user) {
        return new Response(JSON.stringify({ user }), { status: 200 })
      } else {
        throw new Error('Invalid token')
      }
    } else {
      throw new Error('No token provided')
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 401 })
  }
}

function generateToken(username) {
  // Generate a secure token for the user
  return 'secure_token_for_' + username
}

function invalidateToken(token) {
  // Invalidate the session token
}

function validateToken(token) {
  // Validate the session token and return user data
  if (token.startsWith('secure_token_for_')) {
    const username = token.split('_')[3]
    return { username, roles: ['accountant', 'small_business_owner'] }
  } else {
    return null
  }
}

// Add CORS headers to responses
async function addCORSHeaders(response) {
  response.headers.append('Access-Control-Allow-Origin', '*')
  response.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

handleRequest = async (request) => {
  const response = await handleRequest(request)
  return addCORSHeaders(response)
}