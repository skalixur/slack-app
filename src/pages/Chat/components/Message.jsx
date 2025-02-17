import { Link } from 'react-router'
import { getTimestamp } from '../../../lib/getTimestamp'
export const Message = ({ children }) => {
  return (
    <div className="flex min-w-full gap-3 px-2 py-2">{children}</div>
  )
}

export const MessageContent = ({ children }) => {
  return <div className="flex w-full flex-col">{children}</div>
}

export const MessageHeader = ({ children }) => {
  return (
    <span className="flex w-full flex-wrap items-baseline gap-2 font-semibold">{children}</span>
  )
}

export const MessageAuthor = ({ children, id }) => {
  return <Link to={`/chat/user/${id}`} className="break-all whitespace-normal">{children}</Link>
}

export const MessageBody = ({ children }) => {
  return (
    <div className="w-full font-light break-words whitespace-normal">{children}</div>
  )
}

export const MessageTimestamp = ({ createdAtDate }) => {
  const timeStampMessage = getTimestamp(createdAtDate)

  return (
    <span className="text-xs font-normal text-muted-foreground">{timeStampMessage}</span>
  )
}
