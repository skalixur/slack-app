import { TabsList } from "@/components/ui/tabs";
import { ChatSidebarTabTrigger } from "./ChatSidebarTabTrigger";

export const ChatSidebarHeader = () => (
  <TabsList className="flex w-full border-b shadow-sm">
    <ChatSidebarTabTrigger value="channels">Channels</ChatSidebarTabTrigger>
    <ChatSidebarTabTrigger value="users">Users</ChatSidebarTabTrigger>
  </TabsList>
);

