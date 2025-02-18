import API from './api'
import handleAPIError from '../handleAPIError'

async function getChannelDetails(channelId) {
  try {
    const response = await API.get(`/channels/${channelId}`)

    const {
      data: { data: channelDetails },
    } = response

    const result = {
      ok: true,
      channelDetails,
    }

    console.log(result)

    return result
  } catch (error) {
    return handleAPIError(error)
  }
}

export default getChannelDetails
