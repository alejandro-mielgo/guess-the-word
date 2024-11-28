import { useState, useEffect } from 'react'
import Row from './components/Row'
  
function App() {
  
  let message = 'You have 6 tries to guess the word'

  const  [ wordArray, setWordAray]= useState([])
  const [ gameState, setGameState] = useState("begin")
  const [ count, setCount ] = useState(0)

  const fetchData = () =>{
    const url = `https://random-word-api.herokuapp.com/word?length=5`
   
    fetch(url)
      .then(response => { 
        if(response.ok){
          return response.json()
        }
        throw new Error('something went wrong with the fetching promise')
      })
      .then(data => {
        console.log(data)
        setWordAray(data[0].split(''))
        console.log('word from fetch:', wordArray)
      })
      .catch(error => console.log(error))
  }

  useEffect(fetchData,[])

  const updateGameState = (state) => {
    setGameState(state)
    setCount(count => count + 1)
  }

  function handle_reload(){
    location.reload()
  }


  if(gameState === 'win'){
    message = 'You Won!'
  } else if (count >=6 && gameState=='playing') {
    message = `You Lost! the word was ${wordArray.join('')} `
    console.log(message)
  } else if(gameState=='playing') {
    message = `try ${count} out of 6`
  }

  return (
    <div>
      <h1 className='display-5 hover-shadow'>Guess the Word</h1>
      <p className="text-center"></p>
      <div className='text-center'>
        <Row wordArray={wordArray} updateGameState={updateGameState} /> <br/>
        <Row wordArray={wordArray} updateGameState={updateGameState} /> <br/>
        <Row wordArray={wordArray} updateGameState={updateGameState} /> <br/>
        <Row wordArray={wordArray} updateGameState={updateGameState} /> <br/>
        <Row wordArray={wordArray} updateGameState={updateGameState} /> <br/>
        <Row wordArray={wordArray} updateGameState={updateGameState} /> <br/>
        <div><p className='message'>{message}</p></div>
        { count == 6 ? <button className='btn btn-primary' onClick={handle_reload}>Play again</button> : null }
      </div>
    </div>
  )
}

export default App