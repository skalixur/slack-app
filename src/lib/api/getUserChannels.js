import API from './api'
import handleAPIError from './handleAPIError'

async function getUserChannels() {
  try {
    const response = await API.get('/channels')

    const {
      data: { data: userChannels },
    } = response

    const result = {
      ok: true,
      userChannels,
    }

    return result
  } catch (error) {
    return handleAPIError(error)
  }
}

export default getUserChannels
