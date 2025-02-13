import {
  SidebarGroup, SidebarGroupContent, SidebarMenu
} from "@/components/ui/sidebar";
import { ChatSidebarGroupLabel } from "./ChatSidebarGroupLabel";

export const ChatSidebarGroup = ({ title, icon, children }) => (
  <SidebarGroup>
    <ChatSidebarGroupLabel>
      {icon} {title}
    </ChatSidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>{children}</SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
);

