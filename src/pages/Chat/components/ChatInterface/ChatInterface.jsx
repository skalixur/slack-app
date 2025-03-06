import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { IDAvatar } from '../../../../components/IDAvatar'
import AuthContext from '../../../../contexts/AuthContext'
import UserChannelContext from '../../../../contexts/UserChannelContext'
import checkAndToastAPIError from '../../../../lib/checkAndToastAPIError'
import {
  Message,
  MessageAuthor,
  MessageBody,
  MessageContent,
  MessageHeader,
  MessageTimestamp,
} from '../Message'
import { ChatForm } from './ChatForm'
import { ChatHeader } from './ChatHeader'

dayjs.extend(localizedFormat)

export default function ChatInterface({
  getChatsFunction,
  sendChatFunction,
  info,
}) {
  const { allUsers } = useContext(UserChannelContext)
  const {
    authInfo: { uid },
  } = useContext(AuthContext)

  const [chats, setChats] = useState([])
  const [message, setMessage] = useState('')
  const [isPolling, setIsPolling] = useState(false)

  const scrollRef = useRef(null)
  const toggleRef = useRef(null)

  const messageContainerId = info?.channel?.id || info?.user?.id
  const isChannel = info.type === 'channel'
  const messageContainerName = isChannel ? info.channel.name : info.user.uid

  const fetchChats = useCallback(async () => {
    if (document.hidden) return
    const apiResponse = await getChatsFunction()
    if (!checkAndToastAPIError(apiResponse)) return
    setChats(apiResponse.chats)
  }, [getChatsFunction])

  useEffect(() => {
    fetchChats()
  }, [messageContainerId])
  useEffect(() => {
    if (!isPolling) return
    const pollingInterval = setInterval(fetchChats, 300)
    return () => clearInterval(pollingInterval)
  }, [isPolling, fetchChats])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [chats])

  const handleMessageChange = (e) => setMessage(e.target.value)
  const handlePollingToggle = (isPressed) => {
    toggleRef.current.dataset.state = isPressed ? "on" : "off"
    setIsPolling(isPressed)
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    const trimmedMessage = message.trim()
    if (!trimmedMessage) return

    setMessage('')
    const messageToSave = {
      created_at: new Date().toISOString(),
      body: trimmedMessage,
      sender: allUsers.find((user) => user.uid === uid),
      receiver: { id: messageContainerId },
    }
    setChats((prev) => [...prev, messageToSave])

    const apiResponse = await sendChatFunction(trimmedMessage)
    if (!checkAndToastAPIError(apiResponse)) return
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  const ChatElements = useMemo(
    () =>
      chats
        .slice()
        .reverse()
        .map((chat, index) => (
          <Message key={`${chat.id}-${index}`}>
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
        )),
    [chats],
  )

  return (
    <>
      <ChatHeader
        isChannel={isChannel}
        messageContainerId={messageContainerId}
        messageContainerName={messageContainerName}
        info={info}
      />
      <div
        ref={scrollRef}
        className='scrollbar flex grow flex-col-reverse overflow-y-auto'
      >
        {ChatElements}
      </div>
      <ChatForm
        {...{
          message,
          handleMessageChange,
          handleSendMessage,
          handleKeyDown,
          handlePollingToggle,
          isPolling,
          toggleRef,
        }}
      />
    </>
  )
}

