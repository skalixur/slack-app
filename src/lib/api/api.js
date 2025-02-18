import axios from 'axios'
import localStorageKeys from '../localStorageKeys'

const baseURL = import.meta.env.VITE_SLACK_API_BASE_URL

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

API.interceptors.request.use((config) => {
  const authInfo = JSON.parse(
    localStorage.getItem(localStorageKeys.LOCALSTORAGE_KEY_AUTHINFO),
  )
  if (authInfo) {
    const { accessToken, client, expiry, uid } = authInfo
    config.headers['access-token'] = accessToken
    config.headers['client'] = client
    config.headers['expiry'] = expiry
    config.headers['uid'] = uid
  }
  return config
})

export default API
