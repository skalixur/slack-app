import { Avatar, AvatarFallback } from "./ui/avatar"

export function IDAvatar({ children }) {
  return (
    <Avatar>
      <AvatarFallback className="tabular-nums">{children}</AvatarFallback>
    </Avatar>
  )
}
