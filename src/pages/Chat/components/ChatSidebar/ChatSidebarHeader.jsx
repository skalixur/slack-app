import { TabsList } from '@/components/ui/tabs'
import { ChatSidebarTabTrigger } from './ChatSidebarTabTrigger'
import { Input } from '../../../../components/ui/input'
import { Search } from 'lucide-react'

export const ChatSidebarHeader = ({ onFilterChange }) => (
  <div className='p-2 flex flex-col gap-2'>
    <TabsList className='flex w-full border-b shadow-sm'>
      <ChatSidebarTabTrigger value='channels'>Channels</ChatSidebarTabTrigger>
      <ChatSidebarTabTrigger value='users'>Users</ChatSidebarTabTrigger>
    </TabsList>
    <div className='flex items-center w-full gap-2'>
      <Search className='stroke-muted-foreground' />
      <Input onChange={onFilterChange} placeholder='Search...' />
    </div>
  </div>
)
