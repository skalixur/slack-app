import { SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet } from 'react-router'
import { ThemeToggle } from '../../components/ThemeToggle'
import { Button } from '../../components/ui/button'
import { SidebarProvider } from '../../components/ui/sidebar'
import { TooltipProvider } from '../../components/ui/tooltip'
import checkAndToastAPIError from '../../lib/checkAndToastAPIError'
import getUserChannels from '../../lib/api/getUserChannels'
import ChatSidebar from './components/ChatSidebar/ChatSidebar'
import getChats from '../../lib/api/getChats'
import createChannel from '../../lib/api/createChannel'
import { UserChannelProvider } from '../../contexts/UserChannelContext'

export default function ChatLayout() {

  async function testFunction() {
    const apiResponse = createChannel('hello chat', [1])
    if (!checkAndToastAPIError(apiResponse)) return
    console.log(apiResponse.chats)
  }

  return (
    <UserChannelProvider>
      <TooltipProvider>
        <SidebarProvider>
          <ChatSidebar />
          <SidebarTrigger />
          <main className='min-w-full'>
            <ThemeToggle />
            <Button onClick={testFunction}>Test button</Button>
            <Outlet />
          </main>
        </SidebarProvider>
      </TooltipProvider>
    </UserChannelProvider>
  )
}
