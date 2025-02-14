import { LogOut } from 'lucide-react'
import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"
import { Button } from "./ui/button"
import UserChannelContext from '../contexts/UserChannelContext'
import { logOut } from '../lib/logOut'

function LogOutButton(props) {
  return (
    <Button {...props} onClick={logOut}>
      <LogOut />
      {props.children}
    </Button >
  )
}

export default LogOutButton
