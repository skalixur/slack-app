import axios from 'axios'

const API = axios.create({
  baseURL: 'https://slack-api.replit.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

API.interceptors.request.use((config) => {
  const authInfo = JSON.parse(localStorage.getItem('authInfo'))
  if (authInfo) {
    console.log(authInfo)
    const { accessToken, client, expiry, uid } = authInfo
    config.headers['access-token'] = accessToken
    config.headers['client'] = client
    config.headers['expiry'] = expiry
    config.headers['uid'] = uid
  }
  return config
})

export default API
