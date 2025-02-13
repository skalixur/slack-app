import { SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router"
import LogOutButton from "../../components/LogOutButton"
import { Button } from "../../components/ui/button"
import { SidebarProvider } from "../../components/ui/sidebar"
import checkAndToastAPIError from "../../lib/api/checkAndToastAPIError"
import getAllUsers from "../../lib/api/getAllUsers"
import { TooltipProvider } from "../../components/ui/tooltip"
import ChatSidebar from "./components/ChatSidebar/ChatSidebar"

export default function ChatLayout() {

  async function logUsers() {
    const apiResponse = await getAllUsers()
    console.log(apiResponse)
    if (!(await checkAndToastAPIError(apiResponse))) return;
  }

  return (
    <TooltipProvider>
      < SidebarProvider >
        <ChatSidebar />
        <main>
          <SidebarTrigger />
          Chat Layout
          <Outlet />

          <Button onClick={logUsers}>log users</Button>
          <LogOutButton />

        </main>
      </SidebarProvider>
    </TooltipProvider>
  )
}
