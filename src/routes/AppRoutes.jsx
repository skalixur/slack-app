import ChannelChat from '@/pages/Chat/ChannelChat'
import ChatIndex from '@/pages/Chat/ChatIndex'
import ChatLayout from '@/pages/Chat/ChatLayout'
import UserChat from '@/pages/Chat/UserChat'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import { Navigate, Route, Routes } from 'react-router'
import { useLogin, useNoLogin } from '@/hooks/useLogin'

function AppRoutes() {
  function NavigateToChat(props) {
    const redirect = useLogin()
    return redirect || <Navigate to='/chat' replace />
  }

  function PublicOnlyLogin() {
    const redirect = useNoLogin()
    return redirect || <Login />
  }

  function PublicOnlySignup() {
    const redirect = useNoLogin()
    return redirect || <Signup />
  }

  function ProtectedChatLayout() {
    const redirect = useLogin()
    return redirect || <ChatLayout />
  }

  function ProtectedNavigateToChat() {
    const redirect = useLogin()
    return redirect || <Navigate to='/chat' replace />
  }

  return (
    <Routes>
      <Route path='*' element={<NavigateToChat />} />
      <Route path='/' element={<Home />} />
      <Route path='login' element={<PublicOnlyLogin />} />
      <Route path='signup' element={<PublicOnlySignup />} />
      <Route path='chat' element={<ProtectedChatLayout />}>
        <Route index element={<ChatIndex />} />
        <Route path='user/:user' element={<UserChat />} />
        <Route path='channel/:channel' element={<ChannelChat />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
