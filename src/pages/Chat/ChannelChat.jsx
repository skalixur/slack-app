import React from 'react'
import ChatInterface from './components/ChatInterface'
import getChats from '../../lib/api/getChats'
import { useParams } from 'react-router'

export default function ChannelChat() {
  const { channel } = useParams()
  return (
    <ChatInterface
      getChatsFunction={() => {
        return getChats(channel, 'Channel')
      }}
    />
  )
}
