import { TabsTrigger } from '@/components/ui/tabs'

export const ChatSidebarTabTrigger = ({ value, children }) => (
  <TabsTrigger className='flex-auto hover:cursor-pointer' value={value}>
    {children}
  </TabsTrigger>
)
