import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { memo } from 'react'
import { Link } from 'react-router'

export const ChatSidebarMenuItem = memo(({ children, tooltip, to }) => (
  <SidebarMenuItem className='flex w-full items-center justify-center'>
    <Tooltip delayDuration={700}>
      <TooltipTrigger asChild>
        <SidebarMenuButton asChild className='min-w-full hover:cursor-pointer'>
          <Link to={to}>{children}</Link>
        </SidebarMenuButton>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  </SidebarMenuItem>
))
