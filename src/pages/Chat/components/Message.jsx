import { Link } from 'react-router'
import { getTimestamp } from '../../../lib/getTimestamp'

export const Message = ({ children }) => {
  return (
    <div className='flex min-w-full items-center gap-3 py-2 px-5'>{children}</div>
  )
}
export const MessageContent = ({ children }) => {
  return <div className='flex flex-col'>{children}</div>
}
export const MessageHeader = ({ children }) => {
  return (
    <span className='flex items-baseline gap-2 font-semibold'>{children}</span>
  )
}

export const MessageAuthor = ({ children, id }) => {
  return <Link to={`/chat/user/${id}`}>{children}</Link>
}
export const MessageBody = ({ children }) => {
  return <div className='font-light'>{children}</div>
}
export const MessageTimestamp = ({ createdAtDate }) => {
  const timeStampMessage = getTimestamp(createdAtDate)

  return (
    <span className='text-xs font-normal text-muted-foreground'>
      {timeStampMessage}
    </span>
  )
}
