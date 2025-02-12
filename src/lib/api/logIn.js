import API from '@/lib/api/api'

export default async function logIn(email, password) {
  try {
    const responseData = await API.post(`/auth/sign_in`, {
      email,
      password,
    })

    console.log(email, password)

    const { headers: responseHeaders } = responseData
    const { 'access-token': accessToken, client, expiry, uid } = responseHeaders
    const authHeaders = {
      accessToken,
      client,
      expiry,
      uid,
    }
    console.log(responseData)
    return authHeaders
  } catch (error) {
    if (error.response) {
      console.error(error.response?.data?.errors)
      return
    }
    console.error(error)
  }
}
