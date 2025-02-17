import { SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet } from 'react-router'
import { ThemeToggle } from '../../components/ThemeToggle'
import { SidebarProvider } from '../../components/ui/sidebar'
import { TooltipProvider } from '../../components/ui/tooltip'
import ChatSidebar from './components/ChatSidebar/ChatSidebar'

export default function ChatLayout() {

  return (
    <TooltipProvider>
      <SidebarProvider>
        <ChatSidebar />
        <SidebarTrigger className="mt-2 ml-2 p-1" />
        <main className='flex max-h-[100vh] w-full flex-col justify-end'>
          <Outlet />
        </main>
      </SidebarProvider>
    </TooltipProvider>
  )
}
