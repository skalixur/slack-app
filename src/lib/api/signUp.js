import API from '@/lib/api/api'
import handleAPIError from './handleAPIError'

export default async function signUp(email, password, passwordConfirmation) {
  if (!email || !password || !passwordConfirmation) {
    throw new Error('Missing arguments')
  }
  try {
    const responseData = await API.post(`/auth`, {
      email,
      password,
      password_confirmation: passwordConfirmation,
    })

    const {
      data: { data },
    } = responseData

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
      data,
      authHeaders,
    }

    return result
  } catch (error) {
    return handleAPIError(error)
  }
}
