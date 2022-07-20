import { useState } from 'react'
import Dialog from './components/dialog/Dialog'

import './App.css'
function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='app'>
      <button onClick={() => setIsOpen(true)}>
          Click to Open Modal
        </button>

        <Dialog handleClose={()=>setIsOpen(false)} isOpen={isOpen}>
          <>
            <div>dialog content</div>
            <button>button</button>
          </>
        </Dialog>
    </div>
  )
}

export default App
