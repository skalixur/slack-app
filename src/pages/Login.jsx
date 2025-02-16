import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useContext, useState } from 'react'
import { Link } from 'react-router'
import { toast } from 'sonner'
import AccountForm, {
  AccountFormCard,
  AccountFormHeading,
  AccountFormInputContainer,
} from '../components/AccountForm'
import TextWithGradient from '../components/TextWithGradient'
import WarningAlert from '../components/WarningAlert'
import AuthContext from '../contexts/AuthContext'
import checkAndToastAPIError from '../lib/checkAndToastAPIError'
import logIn from '../lib/api/logIn'

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
    if (!email || !password) {
      toast(<WarningAlert>Missing email or password!</WarningAlert>)
    }

    const apiResponse = await logIn(email, password)
    if (!checkAndToastAPIError(apiResponse)) return

    const { authHeaders } = apiResponse
    setAuthInfo(authHeaders)
  }

  return (
    <AccountForm>
      <AccountFormCard onSubmit={handleFormSubmit}>
        <AccountFormHeading>
          Sign in to <TextWithGradient>ChetChat</TextWithGradient>
        </AccountFormHeading>
        <AccountFormInputContainer>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            id='email'
            placeholder='Email'
            value={email}
            onChange={handleEmailChange}
          />
          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
          />
          <Button className='min-w-full' type='submit'>
            Log in
          </Button>
        </AccountFormInputContainer>
        <Link className='text-slate-400 font-light' to='/signup'>
          Don't have an account?{' '}
          <span className='underline underline-offset-2 underline-'>
            Sign up
          </span>
        </Link>
      </AccountFormCard>
    </AccountForm>
  )
}

export default Login
