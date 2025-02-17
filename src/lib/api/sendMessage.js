import API from '@/lib/api/api'
import handleAPIError from '../handleAPIError'

export default async function sendMessage(
  receiverId,
  receiverClass,
  messageBody,
) {
  if (!receiverId || !receiverClass || !messageBody) {
    throw new Error('Missing arguments')
  }

  try {
    const responseData = await API.post(`/messages`, {
      receiver_id: receiverId,
      receiver_class: receiverClass,
      body: messageBody,
    })

    const {
      data: { data },
    } = responseData

    const result = {
      ok: true,
      message: data,
    }

    return result
  } catch (error) {
    return handleAPIError(error)
  }
}
