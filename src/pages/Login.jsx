import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useState } from "react"
import AuthContext from "../contexts/AuthContext"
import logIn from "../lib/api/logIn"
import localStorageKeys from "../lib/localStorageKeys"
import { TypographyH1 } from "../components/ui/typography"
import { Link } from "react-router"
import { GridPattern } from "../components/magicui/grid-pattern"
import { cn } from '@/lib/utils'
import { GlowingEffect } from "../components/ui/glowing-effect"
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
    <main className="max-w-full min-h-[100vh] grid place-items-center">
      <form className="bg-white flex flex-col gap-5 p-8 w-full h-full justify-center items-center sm:border rounded-2xl sm:max-w-lg sm:max-h-2/3" onSubmit={handleFormSubmit}>
        <TypographyH1>Sign in to <TextWithGradient>Chet.</TextWithGradient></TypographyH1>
        <div className="flex flex-col gap-3 min-w-full">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" value={email} onChange={handleEmailChange} />
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          <Button className="min-w-full" type="submit">Log in</Button>
        </div>
        <Link className="text-slate-400" to="/signup">Don't have an account? <span className="underline underline-offset-2 underline-">Sign up</span></Link>
      </form>
    </main>
  )
}

function TextWithGradient({ children }) {
  return (
    <div className="inline relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
      <span className="">
        {children}
      </span>
    </div>
  )
}

export default Login
