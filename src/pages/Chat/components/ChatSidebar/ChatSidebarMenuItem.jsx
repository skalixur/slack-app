import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Plus } from 'lucide-react'
import { memo } from 'react'
import { Link, useParams } from 'react-router'
import { SidebarMenuAction } from '../../../../components/ui/sidebar'
import SelectUsersComboBox from '../../../../components/SelectUsersComboBox'
import addMemberToChannel from '../../../../lib/api/addMemberToChannel'
import checkAndToastAPIError from '../../../../lib/checkAndToastAPIError'

export const ChatSidebarMenuItem = memo(({ children, tooltip, to }) => {
  const { channel } = useParams()
  async function handleInviteUser(user) {
    const apiResponse = await addMemberToChannel(channel, user.id)
    if (!checkAndToastAPIError(apiResponse)) return;
    console.log(apiResponse)
  }

  return (
    <SidebarMenuItem className="flex w-full items-center justify-center">
      <ContextMenu>
        <Tooltip delayDuration={700}>
          <ContextMenuTrigger asChild>
            <TooltipTrigger asChild>
              <SidebarMenuButton asChild className="min-w-full hover:cursor-pointer">
                <Link to={to}>{children}</Link>
              </SidebarMenuButton>
            </TooltipTrigger>
          </ContextMenuTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>

        <ContextMenuContent>
          <ContextMenuItem asChild>
            <SelectUsersComboBox handleSelectUser={handleInviteUser}>Invite user</SelectUsersComboBox>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </SidebarMenuItem>
  )
})
