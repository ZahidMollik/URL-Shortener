import React, { useState } from 'react'
import Shorturl from './components/Shorturl'

function App() {

  return (
    < >
     <div className='w-full px-4 min-w-[350px] h-screen bg-cyan-200 flex justify-center items-center gap-10 '>
      <Shorturl/>
     </div>
    </>
  )
}

export default App
