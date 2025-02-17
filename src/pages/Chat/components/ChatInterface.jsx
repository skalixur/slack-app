import { Repeat, SendHorizontal } from 'lucide-react'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { IDAvatar } from '../../../components/IDAvatar'
import { Button } from '../../../components/ui/button'
import { Textarea } from '../../../components/ui/textarea'
import { Toggle } from '../../../components/ui/toggle'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../components/ui/tooltip'
import AuthContext from '../../../contexts/AuthContext'
import UserChannelContext from '../../../contexts/UserChannelContext'
import checkAndToastAPIError from '../../../lib/checkAndToastAPIError'
import {
  Message,
  MessageAuthor,
  MessageBody,
  MessageContent,
  MessageHeader,
  MessageTimestamp,
} from './Message'

export default function ChatInterface({ getChatsFunction, sendChatFunction }) {
  const [isPolling, setIsPolling] = useState(false)
  const { allUsers } = useContext(UserChannelContext)
  const { authInfo: { uid } } = useContext(AuthContext)
  const [chats, setChats] = useState([])
  const [message, setMessage] = useState('')
  const params = useParams()
  const channelOrUserId = params?.channel || params?.user

  useEffect(() => {
    async function fetchChats() {
      if (!isPolling) return
      const apiResponse = await getChatsFunction()
      if (!checkAndToastAPIError(apiResponse)) return
      setChats(apiResponse.chats)
    }

    const pollingInterval = setInterval(fetchChats, 2000)

    return () => {
      clearInterval(pollingInterval)
    }
  }, [channelOrUserId, isPolling])

  function handleMessageChange(e) {
    setMessage(e.target.value)
  }

  function handlePollingToggle(isPressed) {
    setIsPolling(isPressed)
  }

  async function handleSendMessage(e) {
    e.preventDefault()
    setMessage('')
    const apiResponse = await sendChatFunction(channelOrUserId, message)
    if (!checkAndToastAPIError(apiResponse)) return

    const messageToSave = {
      ...apiResponse.message,
      sender:
        allUsers.find((user) => user.uid === uid),
      receiver: {
        id: channelOrUserId
      }
    }
    setChats([...chats, messageToSave])
  }

  const ChatElements = useMemo(

    () =>
      chats.map(
        (chat, index) => {
          return <Message key={`${chat.id}-${index}`}>
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
        }
      ),
    [chats]
  )

  return (
    <div className='flex flex-col h-full w-full'>
      <div className='flex-1 max-h-[85vh] w-full overflow-y-auto scrollbar'>
        {ChatElements}
      </div>
      <form className='p-2 w-full items-center gap-2 flex flex-nowrap'>
        <Textarea value={message} onChange={handleMessageChange} className='w-[40vw]' />

        <Button className="size-9" onClick={handleSendMessage}>
          <SendHorizontal />
        </Button>
        <Tooltip delayDuration={700}>
          <TooltipTrigger asChild>
            <Toggle onPressedChange={handlePollingToggle} className="size-9"><Repeat /></Toggle>
          </TooltipTrigger>
          <TooltipContent>
            Message polling: {isPolling ? 'on' : 'off'}
          </TooltipContent>
        </Tooltip>
      </form>
    </div>
  )
}
