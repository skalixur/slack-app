import { createContext } from "react"
import { useStateWithLocalStorage } from "@/hooks/useStateWithLocalStorage"
import localStorageKeys from "../lib/localStorageKeys"

const defaultUsersAndChannelsContextValue = {
  allUsers: [],
  userChannels: []
}

const UserChannelContext = createContext(defaultUsersAndChannelsContextValue)

export function UserChannelProvider({ children }) {
  const [allUsersAndChannels, setAllUsersAndChannels] = useStateWithLocalStorage(localStorageKeys.LOCALSTORAGE_KEY_USERS_AND_CHANNELS, defaultUsersAndChannelsContextValue)

  return (
    <UserChannelContext.Provider value={{ allUsersAndChannels, setAllUsersAndChannels }}>
      {children}
    </UserChannelContext.Provider>
  )
}

export default UserChannelContext
