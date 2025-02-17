import { useState, useEffect } from 'react'

export function useStateWithLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    const value = localStorage.getItem(key)

    if (!value) {
      localStorage.setItem(key, JSON.stringify(initialValue))
      return initialValue
    }

    return JSON.parse(value)
  })

  useEffect(() => {
    console.log('Setting key', key, 'to value', state)
    localStorage.setItem(key, JSON.stringify(state))
  }, [state])

  return [state, setState]
}
