import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
import { Plus, Trash, UserPlus, UserX } from 'lucide-react'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '../../../../components/ui/button'
import { DialogFooter } from '../../../../components/ui/dialog'
import { Input } from '../../../../components/ui/input'
import UserChannelContext from '../../../../contexts/UserChannelContext'
import createChannel from '../../../../lib/api/createChannel'
import checkAndToastAPIError from '../../../../lib/checkAndToastAPIError'
import { IDAvatar } from "../../../../components/IDAvatar"
import AuthContext from "../../../../contexts/AuthContext"

export const ChatSidebarCreateChannelsAction = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarGroupAction title='Create channel'>
          <Plus className='hover:cursor-pointer' />
          <span className='sr-only'>Create channel</span>
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
  )
}

export const ChatCreateChannelForm = () => {
  const { setUserChannels, userChannels, allUsers } = useContext(UserChannelContext);
  const [selectedUsers, setSelectedUsers] = useState([])
  const selectedIds = selectedUsers.map(value => JSON.parse(value).id)
  const channelInput = useRef(null);
  const { authInfo: { uid } } = useContext(AuthContext)


  async function handleFormSubmit(e) {
    e.preventDefault();
    const channelName = channelInput.current.value.trim();
    const apiResponse = await createChannel(channelName, selectedIds);
    if (!checkAndToastAPIError(apiResponse)) return;
    setUserChannels([...userChannels, apiResponse.newChannel]);
  }

  function handleSelectUser(value) {
    setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, value])
  }

  function handleRemoveSelectedUser(user) {
    const newSelectedUsers = selectedUsers.filter(value => {
      const selectedUser = JSON.parse(value)
      return selectedUser.id !== user.id
    })

    setSelectedUsers(newSelectedUsers)
  }

  useEffect(() => {
    console.log(selectedUsers)
  }, [selectedUsers])

  const filteredUsers = allUsers.filter(
    (user) => {
      if (user.uid === uid) return false
      return !selectedIds.includes(user.id)
    }
  )

  return (
    <form className='flex flex-col gap-2' onSubmit={handleFormSubmit}>
      <div className='grid grid-cols-3 grid-rows-2 items-center gap-2 text-right'>
        <Label className='col-span-1' htmlFor='channel-name'>
          Channel name
        </Label>
        <Input
          ref={channelInput}
          className='col-span-2'
          id='channel-name'
          placeholder='My channel'
        />
        <Label className='col-span-1' htmlFor='user-ids'>
          Users to add
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="col-span-2" variant="outline" role="combobox">
              <UserPlus />
              Invite users...
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command loop filter={(value, search, keywords) => keywords.some((field) => new RegExp(search, 'i').test(field))
            }>
              <CommandInput placeholder="Search for users" />
              <CommandList className="scrollbar-thin">
                <CommandEmpty>
                  <span className="item-center flex justify-center gap-2 text-muted-foreground">
                    <UserX />
                    No users found
                  </span>
                </CommandEmpty>
                {filteredUsers.map(user => (
                  <CommandItem
                    value={JSON.stringify(user)}
                    keywords={[user.id.toString(), user.uid]}
                    key={user.id}
                    onSelect={handleSelectUser}
                  >
                    <span className='tabular-nums'>
                      {user.id}
                    </span>
                    <span>
                      {user.uid}
                    </span>
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {selectedUsers.length > 0 && <h3 className="text-md p-2 text-left font-semibold">Added users</h3>}
        <div className="col-span-3 flex flex-wrap gap-2 text-left">
          {selectedUsers.map(value => {
            const user = JSON.parse(value)
            return (
              <Button asChild key={user.id} variant="outline" onClick={() => {
                handleRemoveSelectedUser(user)
              }}>
                <div className="flex gap-2">
                  <Trash className="stroke-muted-foreground" />
                  <span className="tabular-nums">
                    {user.id}
                  </span>
                  {user.uid}
                </div>
              </Button>
            )
          })}
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type='submit'>Create channel</Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
};
