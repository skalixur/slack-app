import {
  Sidebar,
  SidebarContent,
  useSidebar
} from "@/components/ui/sidebar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import checkAndToastAPIError from "@/lib/api/checkAndToastAPIError";
import getAllUsers from "@/lib/api/getAllUsers";
import { ChevronRight, Hash, Lock, User, Users } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import LogOutButton from "../../../../components/LogOutButton";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../../components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../../../components/ui/sidebar";
import AuthContext from "../../../../contexts/AuthContext";
import UserChannelContext from "../../../../contexts/UserChannelContext";
import getUserChannels from "../../../../lib/api/getUserChannels";
import { ChatSidebarCreateChannelsAction } from "./ChatSidebarCreateChannelsAction";
import { ChatSidebarGroup } from "./ChatSidebarGroup";
import { ChatSidebarHeader } from "./ChatSidebarHeader";
import { ChatSidebarInfo } from "./ChatSidebarInfo";
import { ChatSidebarMenuItem } from "./ChatSidebarMenuItem";
import { ChatSidebarFooter } from "./ChatSidebarFooter";
import { IDAvatar } from "../../../../components/IDAvatar";

function ChatSidebar() {
  const { open } = useSidebar();
  const hasFetched = useRef(false)

  const { allUsersAndChannels, setAllUsersAndChannels } = useContext(UserChannelContext)

  useEffect(() => {
    if (hasFetched.current) {
      return
    }

    async function fetchUsersAndChannels() {
      const usersApiResponse = await getAllUsers();
      if (!(await checkAndToastAPIError(usersApiResponse))) return;

      const channelsApiResponse = await getUserChannels()
      if (!(await checkAndToastAPIError(channelsApiResponse))) return

      setAllUsersAndChannels({
        allUsers: usersApiResponse.allUsers.sort((a, b) => a.id - b.id),
        userChannels: channelsApiResponse.userChannels.sort()
      })
    }

    hasFetched.current = true
    fetchUsersAndChannels()
  }, []);

  return (
    <Tabs defaultValue="channels">
      <Sidebar collapsible="icon">
        {open && <ChatSidebarHeader />}
        <SidebarContent className="scrollbar-none">
          <TabsContent value="channels">
            <ChatSidebarGroup title="Your channels" icon={<Lock />}>
              <ChatSidebarCreateChannelsAction />
              {allUsersAndChannels.userChannels.map((channel) => (
                <ChatSidebarMenuItem key={channel.id} tooltip={channel.name} to={`/chat/channel/${channel.id}`}>
                  <IDAvatar>{channel.id}</IDAvatar>
                  <Hash className="stroke-sidebar-foreground/70" />
                  <ChatSidebarInfo>{channel.name}</ChatSidebarInfo>
                </ChatSidebarMenuItem>
              ))}
            </ChatSidebarGroup>
          </TabsContent>
          <TabsContent value="users">
            <ChatSidebarGroup title="All users" icon={<Users />}>
              {allUsersAndChannels.allUsers.map((user) => (
                <ChatSidebarMenuItem key={user.uid} tooltip={user.email} to={`/chat/user/${user.id}`}>
                  <IDAvatar>{user.id}</IDAvatar>
                  <User className="stroke-sidebar-foreground/70" />
                  <ChatSidebarInfo>{user.email}</ChatSidebarInfo>
                </ChatSidebarMenuItem>
              ))}
            </ChatSidebarGroup>
          </TabsContent>
        </SidebarContent>
        <ChatSidebarFooter />
      </Sidebar>
    </Tabs>
  );
}

export default ChatSidebar;
