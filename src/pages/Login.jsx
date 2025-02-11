import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useState } from "react"
import AuthContext from "../contexts/AuthContext"
import logIn from "../lib/api/logIn"
import localStorageKeys from "../lib/localStorageKeys"

const { LOCALSTORAGE_KEY_AUTHINFO } = localStorageKeys

function Login() {
  const { authInfo, setAuthInfo } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  async function handleFormSubmit(e) {
    e.preventDefault()
    console.table({ email, password })
    const authHeaders = await logIn(email, password)
    setAuthInfo(authHeaders)
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <Label htmlFor="email">Email</Label>
        <Input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
        <Label htmlFor="password">Password</Label>
        <Input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <Button type="submit">Log in</Button>
      </form>
    </div>
  )
}

export default Login
