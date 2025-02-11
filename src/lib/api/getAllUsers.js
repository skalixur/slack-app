import { useContext } from 'react'
import API from './api'

async function getAllUsers() {
  try {
    const response = await API.get('/users')
    const {
      data: { data: allUsers },
    } = response
    return allUsers
  } catch (error) {
    if (error.response) {
      console.error(error.response)
      return
    }
    console.error(error)
  }
}

export default getAllUsers
