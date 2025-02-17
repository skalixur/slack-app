import { SidebarGroupLabel } from '@/components/ui/sidebar'

export const ChatSidebarGroupLabel = ({ children }) => (
  <SidebarGroupLabel className='items-left flex gap-1'>
    {children}
  </SidebarGroupLabel>
)
