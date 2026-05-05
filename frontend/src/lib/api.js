const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const buildHeaders = (extraHeaders = {}) => {
  const headers = {
    ...extraHeaders,
  }

  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  return headers
}

export async function apiRequest(path, options = {}) {
  const { headers, body, ...rest } = options

  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    ...rest,
    headers: buildHeaders(headers),
    body: body ? JSON.stringify(body) : undefined,
  })

  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload !== null
        ? payload.message || 'Request failed'
        : payload || 'Request failed'

    throw new Error(message)
  }

  return payload
}

export const authApi = {
  register: (body) => apiRequest('/register', { method: 'POST', body }),
  login: (body) => apiRequest('/login', { method: 'POST', body }),
  logout: () => apiRequest('/logout', { method: 'POST' }),
  profile: () => apiRequest('/profile', { method: 'GET' }),
}

export const cryptoApi = {
  list: () => apiRequest('/crypto', { method: 'GET' }),
  gainers: () => apiRequest('/crypto/gainers', { method: 'GET' }),
  newest: () => apiRequest('/crypto/new', { method: 'GET' }),
  create: (body) => apiRequest('/crypto', { method: 'POST', body }),
}
