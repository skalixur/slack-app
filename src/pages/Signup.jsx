import { Label } from "@radix-ui/react-label"
import { useContext, useState } from "react"
import { Link } from "react-router"
import { toast } from "sonner"
import AccountForm, { AccountFormCard, AccountFormHeading, AccountFormInputContainer } from "../components/AccountForm"
import TextWithGradient from "../components/TextWithGradient"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import WarningAlert from "../components/WarningAlert"
import AuthContext from "../contexts/AuthContext"
import checkAndToastAPIError from "../lib/api/checkAndToastAPIError"
import signUp from "../lib/api/signUp"

const Signup = () => {
  const { authInfo, setAuthInfo } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const arePasswordsEqual = password === passwordConfirmation

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handlePasswordConfirmationChange(e) {
    setPasswordConfirmation(e.target.value)
  }

  async function handleFormSubmit(e) {
    e.preventDefault()
    if (!email || !password) {
      toast(<WarningAlert>Missing email or password!</WarningAlert>)
      return
    }

    const apiResponse = await signUp(email, password, passwordConfirmation)
    if (!(await checkAndToastAPIError(apiResponse))) return;

    const { authHeaders } = apiResponse
    setAuthInfo(authHeaders)
  }


  return (
    <AccountForm>
      <AccountFormCard onSubmit={handleFormSubmit}>
        <AccountFormHeading>
          Chat with family and friends with <TextWithGradient>ChetChat</TextWithGradient>
        </AccountFormHeading>
        <AccountFormInputContainer>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="johndoe@email.com" value={email} onChange={handleEmailChange} />
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="Your password" value={password} onChange={handlePasswordChange} />
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input type="password" id="confirm-password" placeholder="Please type your password again" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} />
          {!arePasswordsEqual &&
            <WarningAlert>Passwords are not equal! Please re-type the same password.</WarningAlert>
          }
          <Button className="min-w-full" type="submit">Sign up</Button>
        </AccountFormInputContainer>
        <Link className="text-slate-400 font-light" to="/login">Already have an account? <span className="underline underline-offset-2 underline-">Log in</span></Link>
      </AccountFormCard>
    </AccountForm>
  )
}

export default Signup
