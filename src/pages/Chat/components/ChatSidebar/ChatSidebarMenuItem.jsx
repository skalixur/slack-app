import {
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { memo } from "react";

export const ChatSidebarMenuItem = memo(({ children, tooltip }) => (
  <SidebarMenuItem>
    <Tooltip delayDuration={700}>
      <TooltipTrigger asChild>
        <SidebarMenuButton className="hover:cursor-pointer">
          {children}
        </SidebarMenuButton>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  </SidebarMenuItem>
));

