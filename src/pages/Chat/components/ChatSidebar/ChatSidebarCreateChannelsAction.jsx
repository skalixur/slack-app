import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { SidebarGroupAction } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";

export const ChatSidebarCreateChannelsAction = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarGroupAction title="Create channel">
          <Plus className="hover:cursor-pointer" />
          <span className="sr-only">Create channel</span>
        </SidebarGroupAction>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new channel</DialogTitle>
          <DialogDescription>Add users to your channel</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
