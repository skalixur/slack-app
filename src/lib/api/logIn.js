import API from '@/lib/api/api'
import handleAPIError from '../handleAPIError'

export default async function logIn(email, password) {
  if (!email || !password) {
    throw new Error('Missing arguments')
  }
  try {
    const responseData = await API.post(`/auth/sign_in`, {
      email,
      password,
    })

    const { headers: responseHeaders } = responseData
    const { 'access-token': accessToken, client, expiry, uid } = responseHeaders
    const authHeaders = {
      accessToken,
      client,
      expiry,
      uid,
    }
    const result = {
      ok: true,
      authHeaders,
    }
    return result
  } catch (error) {
    return handleAPIError(error)
  }
}
