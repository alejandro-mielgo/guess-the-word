import { useState } from 'react'
import Row from './components/Row'

      
function App() {

  const word = "paria"

  return (
    <div>
      <h1 className='display-3'>Guess the Word</h1>
      <div className='text-center'>
        <Row wordArray={word.split('')}/> <br/>
        <Row wordArray={word.split('')}/> <br/>
        <Row wordArray={word.split('')}/> <br/>
        <Row wordArray={word.split('')}/> <br/>
        <Row wordArray={word.split('')}/> <br/>
      </div>
    </div>
  )
}

export default App