
import { Outlet } from 'react-router'
import './App.css'
import Common from './components/layout/Common'

function App() {


  return (
    <Common>
      <Outlet />
    </Common>
  )
}

export default App
