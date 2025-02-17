import { useSidebar } from '@/components/ui/sidebar'
import { ChevronRight, NotebookPen, User } from 'lucide-react'
import { useContext } from 'react'
import LogOutButton from '../../../../components/LogOutButton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../../../../components/ui/sidebar'
import AuthContext from '../../../../contexts/AuthContext'
import UserChannelContext from '../../../../contexts/UserChannelContext'
import { Button } from '../../../../components/ui/button'
import { Link } from 'react-router'

export function ChatSidebarFooter() {
  const { allUsers, loading } = useContext(UserChannelContext)
  const {
    authInfo: { uid },
  } = useContext(AuthContext)
  const { open } = useSidebar()

  const currentUser = allUsers.find((user) => user.uid === uid)

  return (
    <SidebarMenu className='p-3'>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <User />
              {open && (
                <span className='text-sidebar-foreground/70 tabular-nums'>
                  {!loading && currentUser.id}
                </span>
              )}
              {open && uid}
              <ChevronRight className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='left' className='flex flex-col gap-1 min-w-full'>
            <DropdownMenuItem asChild className="min-w-full">
              <Button asChild variant='outline'>
                <Link to={`/chat/user/${currentUser?.id || ''}`}>
                  <NotebookPen />
                  Message self
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="min-w-full">
              <LogOutButton variant='outline'>{open && `Log out`}</LogOutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
