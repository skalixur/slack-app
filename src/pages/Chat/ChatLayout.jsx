import { Outlet } from "react-router"
import LogOutButton from "../../components/LogOutButton"

export default function ChatLayout() {
  return (
    <div>
      ChatLayout
      <Outlet />
      < LogOutButton />
    </div>
  )
}

