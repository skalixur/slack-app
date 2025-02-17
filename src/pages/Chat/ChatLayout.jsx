import { SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet } from 'react-router'
import { ThemeToggle } from '../../components/ThemeToggle'
import { Button } from '../../components/ui/button'
import { SidebarProvider } from '../../components/ui/sidebar'
import { TooltipProvider } from '../../components/ui/tooltip'
import { UserChannelProvider } from '../../contexts/UserChannelContext'
import sendMessage from '../../lib/api/sendMessage'
import checkAndToastAPIError from '../../lib/checkAndToastAPIError'
import ChatSidebar from './components/ChatSidebar/ChatSidebar'

export default function ChatLayout() {

  return (
    <UserChannelProvider>
      <TooltipProvider>
        <SidebarProvider>
          <ChatSidebar />
          <SidebarTrigger />
          <main className='min-w-full'>
            <ThemeToggle />
            <Outlet />
          </main>
        </SidebarProvider>
      </TooltipProvider>
    </UserChannelProvider>
  )
}
