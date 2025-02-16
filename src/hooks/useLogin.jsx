import { useContext } from 'react'
import { Navigate } from 'react-router'
import AuthContext from '../contexts/AuthContext'

export function useLogin() {
  const { authInfo } = useContext(AuthContext)
  return authInfo ? null : <Navigate to='/login' replace />
}

export function useNoLogin() {
  const { authInfo } = useContext(AuthContext)
  return !authInfo ? null : <Navigate to='/chat' replace />
}
