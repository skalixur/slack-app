import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { IDAvatar } from '../../../components/IDAvatar'
import { Textarea } from '../../../components/ui/textarea'
import checkAndToastAPIError from '../../../lib/checkAndToastAPIError'
import {
  Message,
  MessageAuthor,
  MessageBody,
  MessageContent,
  MessageHeader,
  MessageTimestamp,
} from './Message'

export default function ChatInterface({ getChatsFunction }) {
  const [chats, setChats] = useState([])
  const { channel } = useParams()

  useEffect(() => {
    let ignore = false

    async function fetchChats() {
      if (ignore) return
      const apiResponse = await getChatsFunction()
      if (!checkAndToastAPIError(apiResponse)) return
      setChats(apiResponse.chats)
      console.log(apiResponse.chats)
    }

    fetchChats()

    return () => {
      ignore = true
    }
  }, [channel])

  return (
    <div className='flex flex-col h-full w-full'>
      {/* Messages Container */}
      <div className='flex-1 max-h-[85vh] w-full overflow-y-auto scrollbar'>
        {chats.map((chat) => (
          <Message key={chat.id}>
            <IDAvatar>{chat.sender.id}</IDAvatar>
            <MessageContent>
              <MessageHeader>
                <MessageAuthor id={chat.sender.id}>
                  {chat.sender.uid}
                </MessageAuthor>
                <MessageTimestamp createdAtDate={chat.created_at} />
              </MessageHeader>
              <MessageBody>{chat.body}</MessageBody>
            </MessageContent>
          </Message>
        ))}
      </div>
      <div className='p-2 w-full'>
        <Textarea className='w-full' />
      </div>
    </div>
  )
}
