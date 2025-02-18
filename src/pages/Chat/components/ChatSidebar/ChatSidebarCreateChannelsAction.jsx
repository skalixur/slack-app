import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { SidebarGroupAction } from '@/components/ui/sidebar'
import { DialogClose } from '@radix-ui/react-dialog'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Plus, Trash } from 'lucide-react'
import { useContext, useRef, useState } from 'react'
import { toast } from "sonner"
import SelectUsersComboBox from "../../../../components/SelectUsersComboBox"
import { Button } from '../../../../components/ui/button'
import { DialogFooter } from '../../../../components/ui/dialog'
import { Input } from '../../../../components/ui/input'
import WarningAlert from "../../../../components/WarningAlert"
import AuthContext from "../../../../contexts/AuthContext"
import UserChannelContext from '../../../../contexts/UserChannelContext'
import createChannel from '../../../../lib/api/createChannel'
import checkAndToastAPIError from '../../../../lib/checkAndToastAPIError'

export const ChatSidebarCreateChannelsAction = () => (
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
      <ChatCreateChannelForm />
    </DialogContent>
  </Dialog>
);

export const ChatCreateChannelForm = () => {
  const { setUserChannels, userChannels, allUsers } = useContext(UserChannelContext);
  const { authInfo: { uid } } = useContext(AuthContext);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const channelInput = useRef(null);

  const selectedIds = new Set(selectedUsers.map(user => user.id));

  async function handleFormSubmit(e) {
    e.preventDefault();
    const channelName = channelInput.current.value.trim();

    if (!channelName) {
      toast(<WarningAlert>You must add a channel name!</WarningAlert>);
      return;
    }
    if (selectedUsers.length === 0) {
      toast(<WarningAlert>You must select users to invite!</WarningAlert>);
      return;
    }

    const apiResponse = await createChannel(channelName, [...selectedIds]);
    if (!checkAndToastAPIError(apiResponse)) return;

    setUserChannels([...userChannels, apiResponse.newChannel]);
  }

  function handleSelectUser(user) {
    setSelectedUsers(prev => (selectedIds.has(user.id) ? prev : [...prev, user]));
  }

  function handleRemoveSelectedUser(userId) {
    setSelectedUsers(prev => prev.filter(user => user.id !== userId));
  }

  const filteredUsers = allUsers.filter(user => user.uid !== uid && !selectedIds.has(user.id));

  return (
    <form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>
      <div className="grid grid-cols-3 grid-rows-2 items-center gap-2 text-right">
        <Label className="col-span-1" htmlFor="channel-name">Channel name</Label>
        <Input ref={channelInput} className="col-span-2" id="channel-name" placeholder="My channel" />

        <Label className="col-span-1" htmlFor="user-ids">Users to add</Label>
        <SelectUsersComboBox removeIds={[...selectedIds]} handleSelectUser={handleSelectUser}>
          Invite users...
        </SelectUsersComboBox>

        {selectedUsers.length > 0 && <h3 className="text-md p-2 text-left font-semibold">Added users</h3>}

        <div className="col-span-3 flex flex-wrap gap-2 text-left">
          {selectedUsers.map(user => (
            <Button key={user.id} variant="outline" onClick={() => handleRemoveSelectedUser(user.id)}>
              <div className="flex gap-2">
                <Trash className="stroke-muted-foreground" />
                <span className="tabular-nums">{user.id}</span>
                <span>{user.uid}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="submit">Create channel</Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
};
