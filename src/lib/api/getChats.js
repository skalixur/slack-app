import API from './api'
import handleAPIError from './handleAPIError'

async function getChats(receiverID, receiverClass) {
  try {
    const response = await API.get('/messages', {
      params: {
        receiver_id: receiverID,
        receiver_class: receiverClass,
      },
    })

    const {
      data: { data: chats },
    } = response

    const result = {
      ok: true,
      chats,
    }

    return result
  } catch (error) {
    return handleAPIError(error)
  }
}

export default getChats
