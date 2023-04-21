import axios from 'axios' // Import Axios

export default function (store) {
  // Add a request interceptor
  const requestInterceptor = async (config) => {
    if (store.getters.isAuthenticated && store.getters.getToken) {
      // Add the JWT token to the Authorization header
      config.headers.Authorization = `Bearer ${store.getters.getToken}`
    }
    return config
  }

  const responseInterceptor = async (response) => {
    return response
  }

  // Register the request and response interceptors with Axios
  axios.interceptors.request.use(requestInterceptor)
  axios.interceptors.response.use(responseInterceptor)
}
