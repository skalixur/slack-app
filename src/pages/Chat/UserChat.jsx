import { useParams } from 'react-router'
import getChats from '../../lib/api/getChats'
import sendMessage from '../../lib/api/sendMessage'
import ChatInterface from './components/ChatInterface'

export default function UserChat() {
  const { user } = useParams()
  return (
    <ChatInterface
      getChatsFunction={() => {
        return getChats(user, 'User')
      }}
      sendChatFunction={(userId, body) => {
        return sendMessage(userId, 'User', body)
      }}
    />
  )
}
