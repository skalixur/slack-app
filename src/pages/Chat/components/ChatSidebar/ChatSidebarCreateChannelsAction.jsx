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
import { Plus } from 'lucide-react'
import { useContext, useRef } from 'react'
import { Button } from '../../../../components/ui/button'
import { DialogFooter } from '../../../../components/ui/dialog'
import { Input } from '../../../../components/ui/input'
import UserChannelContext from '../../../../contexts/UserChannelContext'
import createChannel from '../../../../lib/api/createChannel'
import checkAndToastAPIError from '../../../../lib/checkAndToastAPIError'

export const ChatSidebarCreateChannelsAction = () => {
  const { setUserChannels, userChannels } = useContext(UserChannelContext)
  const channelInput = useRef(null)
  const userIdsInput = useRef(null)

  async function handleFormSubmit(e) {
    e.preventDefault()
    const channelName = channelInput.current.value.trim()
    const userIds = userIdsInput.current.value
      .trim()
      .replace(/ +/, '')
      .split(',')

    const apiResponse = await createChannel(channelName, userIds)
    if (!checkAndToastAPIError(apiResponse)) return
    console.log(apiResponse)
    setUserChannels([...userChannels, apiResponse.newChannel])
  }

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
        <form className='flex flex-col gap-2' onSubmit={handleFormSubmit}>
          <div className='grid grid-cols-3 grid-rows-2 gap-2 items-center text-right'>
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
            <Input
              ref={userIdsInput}
              className='col-span-2 tabular-nums'
              id='user-ids'
              placeholder='9, 10, 11'
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='submit'>Create channel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
