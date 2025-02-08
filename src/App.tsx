import About from '@/pages/About'
import Home from '@/pages/Home'
import MainLayout from '@/pages/MainLayout'
import Protected from '@/pages/Protected'
import { Route, Routes } from 'react-router'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='protected' element={<Protected />} />
      </Route>
    </Routes>
  )
}

export default App
