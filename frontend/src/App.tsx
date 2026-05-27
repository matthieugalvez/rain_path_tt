import { BrowserRouter, Routes, Route } from 'react-router-dom'

import FlowPage from './pages/FlowPage'
import HelloPage from './pages/HelloPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FlowPage />} />

        <Route path="/hello" element={<HelloPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
