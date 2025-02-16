import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { SidebarGroupAction } from '@/components/ui/sidebar'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Plus } from 'lucide-react'
import { Input } from '../../../../components/ui/input'
import { Button } from '../../../../components/ui/button'
import { DialogFooter } from '../../../../components/ui/dialog'

export const ChatSidebarCreateChannelsAction = () => {
  function handleFormSubmit(e) {
    e.preventDefault()
    console.log('form submit')
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
              className='col-span-2'
              id='channel-name'
              placeholder='My channel'
            />
            <Label className='col-span-1' htmlFor='user-ids'>
              Users to add
            </Label>
            <Input
              className='col-span-2 tabular-nums'
              id='user-ids'
              placeholder='9, 10, 11'
            />
          </div>
          <DialogFooter>
            <Button type='submit'>Create channel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
