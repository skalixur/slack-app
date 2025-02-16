import { createContext, useEffect, useState } from 'react'
import { useStateWithLocalStorage } from '@/hooks/useStateWithLocalStorage'
import localStorageKeys from '../lib/localStorageKeys'
import getAllUsers from '@/lib/api/getAllUsers'
import getUserChannels from '@/lib/api/getUserChannels'
import checkAndToastAPIError from '@/lib/checkAndToastAPIError'

const UserChannelContext = createContext({
  allUsers: [],
  userChannels: [],
  loading: true,
  setAllUsers: () => { },
  setUserChannels: () => { },
})

export function UserChannelProvider({ children }) {
  const [allUsers, setAllUsers] = useStateWithLocalStorage(
    localStorageKeys.LOCALSTORAGE_KEY_USERS,
    []
  )
  const [userChannels, setUserChannels] = useStateWithLocalStorage(
    localStorageKeys.LOCALSTORAGE_KEY_CHANNELS,
    []
  )
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    async function fetchUsersAndChannels() {
      try {
        const usersApiResponse = await getAllUsers()
        if (!checkAndToastAPIError(usersApiResponse)) return
        const sortedUsers = usersApiResponse.allUsers.sort(
          (a, b) => a.id - b.id
        )
        setAllUsers(sortedUsers)

        const channelsApiResponse = await getUserChannels()
        if (!checkAndToastAPIError(channelsApiResponse)) return
        const sortedChannels = channelsApiResponse.userChannels.sort()
        setUserChannels(sortedChannels)
      } catch (error) {
        console.error('Error fetching users/channels:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsersAndChannels()
  }, [])

  return (
    <UserChannelContext.Provider
      value={{
        allUsers,
        userChannels,
        setAllUsers,
        setUserChannels,
        loading,
      }}
    >
      {children}
    </UserChannelContext.Provider>
  )
}

export default UserChannelContext
