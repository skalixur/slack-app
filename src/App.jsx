import { createContext } from "react"
import { Route, Routes } from "react-router"
import { useStateWithLocalStorage } from "./hooks/useStateWithLocalStorage"
import localStorageKeys from "./lib/localStorageKeys"
import Home from "./pages/Login"
import { AuthContextProvider } from "./contexts/AuthContext"

function App() {

  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App
