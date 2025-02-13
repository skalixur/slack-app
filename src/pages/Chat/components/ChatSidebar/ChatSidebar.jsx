import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  useSidebar
} from "@/components/ui/sidebar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import checkAndToastAPIError from "@/lib/api/checkAndToastAPIError";
import getAllUsers from "@/lib/api/getAllUsers";
import { Lock, User, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChatSidebarCreateChannelsAction } from "./ChatSidebarCreateChannelsAction";
import { ChatSidebarGroup } from "./ChatSidebarGroup";
import { ChatSidebarHeader } from "./ChatSidebarHeader";
import { ChatSidebarMenuItem } from "./ChatSidebarMenuItem";
import { ChatSidebarUserInfo } from "./ChatSidebarUserInfo";

function ChatSidebar() {
  const { open } = useSidebar();
  const [allUsers, setAllUsers] = useState([]);
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) {
      return
    }

    async function fetchUsers() {
      const apiResponse = await getAllUsers();
      if (!(await checkAndToastAPIError(apiResponse))) return;
      setAllUsers(apiResponse.allUsers.sort((a, b) => a.id - b.id));
    }
    hasFetched.current = true
    fetchUsers();
  }, []);

  return (
    <Tabs defaultValue="channels">
      <Sidebar collapsible="icon">
        {open && <ChatSidebarHeader />}
        <SidebarContent>
          <TabsContent value="channels">
            <ChatSidebarGroup title="Your channels" icon={<Lock />}>
              <ChatSidebarCreateChannelsAction />
            </ChatSidebarGroup>
          </TabsContent>
          <TabsContent value="users">
            <ChatSidebarGroup title="All users" icon={<Users />}>
              {allUsers.map((user) => (
                <ChatSidebarMenuItem key={user.uid} tooltip={user.email}>
                  <User className="stroke-sidebar-foreground/70" />
                  <ChatSidebarUserInfo id={user.id} email={user.email} />
                </ChatSidebarMenuItem>
              ))}
            </ChatSidebarGroup>
          </TabsContent>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </Tabs>
  );
}

export default ChatSidebar;
