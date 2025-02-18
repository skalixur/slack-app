import { MessageCircle } from 'lucide-react'
import { SidebarTrigger } from '../../components/ui/sidebar'

export default function ChatIndex() {
  return (
    <div className='flex grow flex-col'>
      <SidebarTrigger className='p-2 m-2' />
      <div className='grid h-full w-full place-items-center text-muted-foreground'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <MessageCircle className='h-32 w-32 md:h-48 md:w-48' />
          Click a user or channel on the left to start chatting!
        </div>
      </div>
    </div>
  )
}
