import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { UserPlus, UserX } from 'lucide-react'
import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import UserChannelContext from '../contexts/UserChannelContext'
import { Button } from './ui/button'

const SelectUsersComboBox = ({
  removeSelf = true,
  handleSelectUser = () => {},
  removeIds = [],
  children,
}) => {
  const { allUsers } = useContext(UserChannelContext)
  const {
    authInfo: { uid },
  } = useContext(AuthContext)

  const filteredUsers = allUsers.filter((user) => {
    if (user.uid === uid && removeSelf) return false
    return !removeIds.includes(user.id)
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='col-span-2' variant='outline' role='combobox'>
          <UserPlus />
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command
          loop
          filter={(value, search, keywords) =>
            keywords.some((field) => new RegExp(search, 'i').test(field))
          }
        >
          <CommandInput placeholder='Search for users' />
          <CommandList className='scrollbar-thin'>
            <CommandEmpty>
              <span className='item-center flex justify-center gap-2 text-muted-foreground'>
                <UserX />
                No users found
              </span>
            </CommandEmpty>
            {filteredUsers.map((user) => (
              <CommandItem
                value={JSON.stringify(user)}
                keywords={[user.id.toString(), user.uid]}
                key={user.id}
                onSelect={(user) => handleSelectUser(JSON.parse(user))}
              >
                <span className='tabular-nums'>{user.id}</span>
                <span>{user.uid}</span>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SelectUsersComboBox
