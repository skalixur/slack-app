import { createContext } from 'react'
import { useStateWithLocalStorage } from '@/hooks/useStateWithLocalStorage'
import localStorageKeys from '@/lib/localStorageKeys'

const returnedAuthInfo =
  localStorage.getItem(localStorageKeys.LOCALSTORAGE_KEY_AUTHINFO) || 'null'
const authInfoIfExistent = JSON.parse(returnedAuthInfo)
const AuthContext = createContext(authInfoIfExistent)

export function AuthContextProvider({ children }) {
  const [authInfo, setAuthInfo] = useStateWithLocalStorage(
    localStorageKeys.LOCALSTORAGE_KEY_AUTHINFO,
    authInfoIfExistent,
  )
  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
