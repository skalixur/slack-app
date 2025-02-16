import { Avatar, AvatarFallback } from './ui/avatar'

export function IDAvatar({ children }) {
  return (
    <Avatar>
      <AvatarFallback className='text-xs tabular-nums'>
        {children}
      </AvatarFallback>
    </Avatar>
  )
}
