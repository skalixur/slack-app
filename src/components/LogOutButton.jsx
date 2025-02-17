import { LogOut } from 'lucide-react'
import { useContext, useEffect } from 'react'
import AuthContext from '../contexts/AuthContext'
import { Button } from './ui/button'
import UserChannelContext from '../contexts/UserChannelContext'
import localStorageKeys from '../lib/localStorageKeys'

function LogOutButton(props) {
  const { setAuthInfo } = useContext(AuthContext)
  const { allUsers, userChannels, setAllUsers, setUserChannels } = useContext(UserChannelContext)
  function logOut() {
    // localStorage.removeItem(localStorageKeys.LOCALSTORAGE_KEY_USERS)
    // localstorage.removeitem(localstoragekeys.localstorage_key_channels)
    // Why doesn't this work?
    console.log(setAllUsers, setUserChannels)
    console.log('set state to null')
    setAllUsers(null)
    setUserChannels(null);
    console.log('set all users and channels to null')
    setAuthInfo(null)
  }

  return (
    <Button {...props} onClick={logOut}>
      <LogOut />
      {props.children}
    </Button>
  )
}

export default LogOutButton
