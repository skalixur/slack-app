import API from './api'
import handleAPIError from './handleAPIError'

async function getAllUsers() {
  try {
    const response = await API.get('/users')

    const {
      data: { data: allUsers },
    } = response

    const result = {
      ok: true,
      allUsers,
    }

    return result
  } catch (error) {
    return handleAPIError(error)
  }
}

export default getAllUsers
