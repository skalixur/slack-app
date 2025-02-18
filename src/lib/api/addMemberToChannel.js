import API from '@/lib/api/api'
import handleAPIError from '../handleAPIError'

export default async function addMemberToChannel(channelId, userId) {
  if (!channelId || !userId) {
    throw new Error('Missing arguments')
  }
  try {
    const responseData = await API.post(`/channel/add_member`, {
      id: channelId,
      member_id: userId,
    })

    if (responseData.data.errors) {
      throw responseData
    }

    const {
      data: { data },
    } = responseData

    const result = {
      ok: true,
      channel: data,
    }

    return result
  } catch (error) {
    return handleAPIError(error)
  }
}
