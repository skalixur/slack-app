import API from '@/lib/api/api'
import handleAPIError from '../handleAPIError'

export default async function createChannel(channelName, userIds) {
  if (!channelName || !userIds) {
    throw new Error('Missing arguments')
  }
  try {
    const responseData = await API.post(`/channels`, {
      name: channelName,
      user_ids: userIds,
    })

    if (responseData.data.errors) {
      throw responseData
    }
    const {
      data: { data },
    } = responseData

    const result = {
      ok: true,
      newChannel: data,
    }

    return result
  } catch (error) {
    return handleAPIError(error)
  }
}
