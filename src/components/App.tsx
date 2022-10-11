import React from 'react'
import '../styles/App.css'
import Complex from './Complex'
import Plain from './Plain'

const App: React.FC = () => {
  return (
    <div className="app">
      <h1 className='title'>Drag&Drop</h1>
      <Plain />
      <Complex />
    </div>
  )
}

export default App
