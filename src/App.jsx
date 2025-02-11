import { useContext } from "react"
import { Navigate, Route, Routes } from "react-router"
import AuthContext from "./contexts/AuthContext"
import ChannelChat from "./pages/Chat/ChannelChat"
import ChatIndex from "./pages/Chat/ChatIndex"
import ChatLayout from "./pages/Chat/ChatLayout"
import UserChat from "./pages/Chat/UserChat"
import Home from "./pages/Home"
import Login from "./pages/Login"

function App() {
  const { authInfo } = useContext(AuthContext)
  function createWithCondition(conditionFunction, redirectTo) {
    return function withCondition(InnerComponent) {
      return function Component(props) {
        return conditionFunction() ? <InnerComponent {...props} /> : <Navigate to={redirectTo} replace />
      }
    }
  }

  function NavigateToChat(props) {
    return <Navigate to="/chat" replace />
  }

  const withLogin = createWithCondition(() => !!authInfo, '/login/')
  const withoutLogin = createWithCondition(() => !authInfo, '/chat/')

  const PublicOnlyLogin = withoutLogin(Login)
  const ProtectedChatLayout = withLogin(ChatLayout)
  const ProtectedNavigateToChat = withLogin(NavigateToChat)

  console.log(authInfo, !!authInfo)


  return (
    <>
      <Routes>
        <Route path="*" element={<NavigateToChat />} />
        <Route path="/" element={<Home />} />
        <Route path="login" element={<PublicOnlyLogin />} />
        <Route path="chat" element={<ProtectedChatLayout />} >
          <Route index element={<ChatIndex />} />
          <Route path="user/:user" element={<UserChat />} />
          <Route path="channel/:channel" element={<ChannelChat />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
