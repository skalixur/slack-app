import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Hash, User } from 'lucide-react'
import SelectUsersComboBox from '../../../../components/SelectUsersComboBox'
import { SidebarTrigger } from '../../../../components/ui/sidebar'
import { handleInviteUser } from '../ChatSidebar/ChatSidebarMenuItem'
import { ChannelMembers } from './ChannelMembers'
import { InfoGrid } from './InfoGrid'

export const ChatHeader = ({
  isChannel,
  messageContainerId,
  messageContainerName,
  info,
}) => (
  <div className='flex w-full items-center gap-2 border-b py-5'>
    <SidebarTrigger className='ml-2 p-2' />
    {isChannel ? (
      <Hash className='stroke-muted-foreground' />
    ) : (
      <User className='stroke-muted-foreground' />
    )}
    <span className='tabular-nums'>{messageContainerId}</span>
    <Sheet>
      <SheetTrigger asChild>
        <span className='font-semibold underline-offset-3 hover:cursor-pointer hover:underline'>
          {messageContainerName}
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{isChannel ? 'Channel Info' : 'User Info'}</SheetTitle>
        </SheetHeader>
        <InfoGrid info={info} isChannel={isChannel} />
        {isChannel && (
          <>
            <span className='flex items-center justify-between px-4'>
              <span className='font-semibold'>Channel members</span>
              <SelectUsersComboBox
                handleSelectUser={(user) => {
                  handleInviteUser(user, messageContainerId)
                }}
              >
                Invite user
              </SelectUsersComboBox>
            </span>
            <ChannelMembers channelId={messageContainerId} />
          </>
        )}
      </SheetContent>
    </Sheet>
  </div>
)
