// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const getApiUrl = () => API_URL

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`API call failed: ${error.message}`)
    throw error
  }
}

export default API_URL
