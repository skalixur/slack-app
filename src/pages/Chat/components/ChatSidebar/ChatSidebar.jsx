import { Sidebar, SidebarContent, useSidebar } from '@/components/ui/sidebar'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Hash, Lock, User, Users } from 'lucide-react'
import { useContext, useEffect, useMemo, useState } from 'react'
import { IDAvatar } from '../../../../components/IDAvatar'
import UserChannelContext from '../../../../contexts/UserChannelContext'
import { ChatSidebarCreateChannelsAction } from './ChatSidebarCreateChannelsAction'
import { ChatSidebarFooter } from './ChatSidebarFooter'
import { ChatSidebarGroup } from './ChatSidebarGroup'
import { ChatSidebarHeader } from './ChatSidebarHeader'
import { ChatSidebarInfo } from './ChatSidebarInfo'
import { ChatSidebarMenuItem } from './ChatSidebarMenuItem'

function ChatSidebar() {
  const { open } = useSidebar()
  const { userChannels, allUsers } = useContext(UserChannelContext)
  const [search, setSearch] = useState('')
  const searchRegExp = new RegExp(search, 'gi')

  const filteredUsers = useMemo(() => {
    return allUsers?.filter((user) =>
      [user.email, user.id].some((field) => searchRegExp.test(field)),
    )
  }, [allUsers, search])

  const filteredChannels = useMemo(() => {
    return userChannels?.filter((channel) =>
      [channel.name, channel.id].some((field) => searchRegExp.test(field)),
    )
  }, [userChannels, search])

  function onFilterChange(e) {
    const search = e.target.value.trim()
    setSearch(search)
  }

  return (
    <Tabs defaultValue='channels'>
      <Sidebar collapsible='icon'>
        {open && <ChatSidebarHeader onFilterChange={onFilterChange} />}
        <SidebarContent className='scrollbar-none'>
          <TabsContent value='channels'>
            <ChatSidebarGroup title='Your channels' icon={<Lock />}>
              <ChatSidebarCreateChannelsAction />
              {filteredChannels?.map((channel) => (
                <ChatSidebarMenuItem
                  key={channel.id}
                  tooltip={channel.name}
                  to={`/chat/channel/${channel.id}`}
                >
                  <IDAvatar>{channel.id}</IDAvatar>
                  <Hash className='stroke-sidebar-foreground/70' />
                  <ChatSidebarInfo>{channel.name}</ChatSidebarInfo>
                </ChatSidebarMenuItem>
              ))}
            </ChatSidebarGroup>
          </TabsContent>
          <TabsContent value='users'>
            <ChatSidebarGroup title='All users' icon={<Users />}>
              {filteredUsers?.map((user) => (
                <ChatSidebarMenuItem
                  key={user.uid}
                  tooltip={user.email}
                  to={`/chat/user/${user.id}`}
                >
                  <IDAvatar>{user.id}</IDAvatar>
                  <User className='stroke-sidebar-foreground/70' />
                  <ChatSidebarInfo>{user.email}</ChatSidebarInfo>
                </ChatSidebarMenuItem>
              ))}
            </ChatSidebarGroup>
          </TabsContent>
        </SidebarContent>
        <ChatSidebarFooter />
      </Sidebar>
    </Tabs>
  )
}

export default ChatSidebar
