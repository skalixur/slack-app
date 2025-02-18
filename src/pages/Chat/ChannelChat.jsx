import { useParams } from 'react-router'
import getChats from '../../lib/api/getChats'
import sendMessage from '../../lib/api/sendMessage'
import ChatInterface from './components/ChatInterface/ChatInterface'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useContext } from 'react'
import UserChannelContext from '../../contexts/UserChannelContext'

export default function ChannelChat() {
  const { channel } = useParams()
  const { userChannels } = useContext(UserChannelContext)

  const currentChannel = {
    channel: userChannels.find(
      (channelIter) => channelIter.id === Number(channel),
    ),
    type: 'channel',
  }
  return (
    <ChatInterface
      getChatsFunction={() => {
        return getChats(channel, 'Channel')
      }}
      sendChatFunction={(body) => {
        return sendMessage(channel, 'Channel', body)
      }}
      info={currentChannel}
    />
  )
}
