import { useParams } from 'react-router'
import getChats from '../../lib/api/getChats'
import sendMessage from '../../lib/api/sendMessage'
import ChatInterface from './components/ChatInterface'

export default function ChannelChat() {
  const { channel } = useParams()
  return (
    <ChatInterface
      getChatsFunction={() => {
        return getChats(channel, 'Channel')
      }}
      sendChatFunction={(channelId, body) => {
        return sendMessage(channelId, 'Channel', body)
      }}
    />
  )
}
