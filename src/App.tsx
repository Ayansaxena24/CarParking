import SlotPage from './SlotPage'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ExitCar from './ExitCar'

const App = () => {
  return (
    <Router>
     <Routes>
      <Route path="/" element={<SlotPage />} />
      <Route path="/vacate/:id" element={<ExitCar />} />
      </Routes> 
    </Router>
  )
}

export default App
