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
    <TooltipProvider>
      <SidebarProvider>
        <ChatSidebar />
        <SidebarTrigger />
        <main className='w-full max-h-[100vh]'>
          <ThemeToggle />
          <Outlet />
        </main>
      </SidebarProvider>
    </TooltipProvider>
  )
}
