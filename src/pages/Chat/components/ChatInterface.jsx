import { Repeat, SendHorizontal } from 'lucide-react'
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
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
  const { allUsers } = useContext(UserChannelContext)
  const { authInfo: { uid } } = useContext(AuthContext)

  const [chats, setChats] = useState([])
  const [message, setMessage] = useState('')
  const [isPolling, setIsPolling] = useState(false)

  const params = useParams()
  const channelOrUserId = params?.channel || params?.user

  const toggleRef = useRef(null)
  const scrollRef = useRef(null)

  const fetchChats = useCallback(async () => {
    if (document.hidden) return
    const apiResponse = await getChatsFunction()
    if (!checkAndToastAPIError(apiResponse)) return
    setChats(apiResponse.chats)
  }, [getChatsFunction])


  useEffect(() => {
    fetchChats()
  }, [channelOrUserId, fetchChats])


  useEffect(() => {
    if (!isPolling) return
    const pollingInterval = setInterval(fetchChats, 2000)
    return () => clearInterval(pollingInterval)
  }, [isPolling, fetchChats])


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chats])

  const handleMessageChange = (e) => setMessage(e.target.value)

  const handlePollingToggle = (isPressed) => {
    toggleRef.current.dataset.state = isPressed ? 'on' : 'off'
    setIsPolling(isPressed)
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    const messageToSend = message.trim()
    if (!messageToSend) return

    setMessage('')

    const messageToSave = {
      created_at: new Date().toISOString(),
      body: messageToSend,
      sender: allUsers.find((user) => user.uid === uid),
      receiver: { id: channelOrUserId }
    }

    setChats((prevChats) => [...prevChats, messageToSave])

    const apiResponse = await sendChatFunction(channelOrUserId, messageToSend)
    if (!checkAndToastAPIError(apiResponse)) return
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  }

  const ChatElements = useMemo(() => (
    chats.map((chat, index) => (
      <Message key={`${chat.id}-${index}`}>
        <IDAvatar>{chat.sender.id}</IDAvatar>
        <MessageContent>
          <MessageHeader>
            <MessageAuthor id={chat.sender.id}>{chat.sender.uid}</MessageAuthor>
            <MessageTimestamp createdAtDate={chat.created_at} />
          </MessageHeader>
          <MessageBody>{chat.body}</MessageBody>
        </MessageContent>
      </Message>
    ))
  ), [chats])



  return (
    <div className="flex h-full flex-col justify-end">
      <div
        ref={scrollRef}
        className="scrollbar overflow-y-auto"
      >
        {ChatElements}
      </div>

      <ChatForm
        message={message}
        onChange={handleMessageChange}
        onSendMessage={handleSendMessage}
        onKeyDown={handleKeyDown}
        handlePollingToggle={handlePollingToggle}
        isPolling={isPolling}
        toggleRef={toggleRef}
      />
    </div>
  )
}

const ChatForm = ({ message, onChange, onSendMessage, onKeyDown, handlePollingToggle, isPolling, toggleRef }) => (
  <form className="flex w-full flex-nowrap items-center gap-2 p-2 pr-8" onSubmit={onSendMessage}>
    <Textarea
      value={message}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="grow resize-none"
    />
    <Button type="submit" className="size-9">
      <SendHorizontal />
    </Button>
    <Tooltip delayDuration={700}>
      <TooltipTrigger asChild>
        <Toggle data-state="off" variant="outline" ref={toggleRef} onPressedChange={handlePollingToggle} className="size-9">
          <Repeat />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>
        Message polling: {isPolling ? 'on' : 'off'}
      </TooltipContent>
    </Tooltip>
  </form>
);

