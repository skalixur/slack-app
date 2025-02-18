import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import { UserChannelProvider } from './contexts/UserChannelContext.jsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <AuthContextProvider>
        <UserChannelProvider>
          <BrowserRouter>
            <App />
            <Toaster />
          </BrowserRouter>
        </UserChannelProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </StrictMode>,
)
