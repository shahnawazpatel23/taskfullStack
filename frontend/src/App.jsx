import { useState } from 'react'


import Navbar from './components/Navbar'
import Chat from './components/Chat';

function App() {
  const [fileId, setFileId] = useState(null);

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <Navbar setFileId={setFileId} />
      <div className="flex-1 overflow-y-auto w-full">
        <Chat fileId={fileId} />
      </div>
    </div>

  )
}

export default App
