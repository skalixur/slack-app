import React from 'react'
import ChatInterface from './components/ChatInterface'
import { useParams } from 'react-router'
import getChats from '../../lib/api/getChats'

export default function UserChat() {
  const { user } = useParams()
  return (
    <ChatInterface getChatsFunction={() => {
      return getChats(user, 'User')
    }} />
  )
}

