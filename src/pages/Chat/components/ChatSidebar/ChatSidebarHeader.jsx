import { TabsList } from '@/components/ui/tabs'
import { Search } from 'lucide-react'
import { Input } from '../../../../components/ui/input'
import { ChatSidebarTabTrigger } from './ChatSidebarTabTrigger'
import TextWithGradient from '../../../../components/TextWithGradient'

export const ChatSidebarHeader = ({ onFilterChange }) => (
  <div className='flex flex-col gap-2 p-2'>
    <TabsList className='flex gap-2 p-2 w-full border-b shadow-sm'>
      <div className='font-semibold'>
        <TextWithGradient>ChetChat</TextWithGradient>
      </div>
      <div className='flex grow'>
        <ChatSidebarTabTrigger value='channels'>Channels</ChatSidebarTabTrigger>
        <ChatSidebarTabTrigger value='users'>Users</ChatSidebarTabTrigger>
      </div>
    </TabsList>
    <div className='flex w-full items-center gap-2'>
      <Search className='stroke-muted-foreground' />
      <Input onChange={onFilterChange} placeholder='Search...' />
    </div>
  </div>
)
