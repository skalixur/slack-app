import { LogOut } from 'lucide-react'
import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"
import { Button } from "./ui/button"

function LogOutButton(props) {
  const { authInfo, setAuthInfo } = useContext(AuthContext)

  function handleLogOutButtonClick() {
    setAuthInfo(null)
  }

  return (
    <Button onClick={handleLogOutButtonClick}>
      <LogOut />
      Log out
    </Button >
  )
}

export default LogOutButton
