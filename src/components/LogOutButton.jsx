import { LogOut } from 'lucide-react'
import { useContext, useEffect } from 'react'
import AuthContext from '../contexts/AuthContext'
import { Button } from './ui/button'
import UserChannelContext from '../contexts/UserChannelContext'
import localStorageKeys from '../lib/localStorageKeys'

function LogOutButton(props) {
  const { setAuthInfo } = useContext(AuthContext)
  const { allUsers, userChannels, setAllUsers, setUserChannels } =
    useContext(UserChannelContext)
  function logOut() {
    setAllUsers(null)
    setUserChannels(null)
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
