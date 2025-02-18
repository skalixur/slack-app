import { useParams } from 'react-router'
import getChats from '../../lib/api/getChats'
import sendMessage from '../../lib/api/sendMessage'
import ChatInterface from './components/ChatInterface/ChatInterface'
import { useContext } from 'react'
import UserChannelContext from '../../contexts/UserChannelContext'

export default function UserChat() {
  const { user } = useParams()
  const { allUsers } = useContext(UserChannelContext)
  const currentUser = {
    user: allUsers.find((userIter) => userIter.id === Number(user)),
    type: 'user',
  }

  return (
    <ChatInterface
      getChatsFunction={() => {
        return getChats(user, 'User')
      }}
      sendChatFunction={(body) => {
        return sendMessage(user, 'User', body)
      }}
      info={currentUser}
    />
  )
}
