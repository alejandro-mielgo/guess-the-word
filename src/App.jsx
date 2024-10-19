import { useState } from 'react'
import Row from './components/Row'


      
function App() {

  const word = "perro"
  const wordArray = word.split("")
  const nrows = word.length>6 <= 6 ? word.length+1 : Math.floor(word.length*1.5)
  const [message, setMessage] = useState(`Guess the word, you have ${nrows} tries `)
  const [tries, setTries] = useState(0)

  const updateGameStatus = (status) => {
    // const aTries = tries+1
    const aTries = tries + 1
    setTries(aTries)
    console.log('tries:',aTries)
    if (aTries===nrows) {
      setMessage("You lost")
    } else {
      setMessage (status==="win" ? "You won!" : "Wrong guess")
    }
    
    

  }

  let rowList = []
  for (let i=0; i < nrows; i++ ){
    rowList.push(<li key={`li${i}`}><Row wordArray={wordArray} key={`row_${i}`} id={`row_${i}`} updateGameStatus={updateGameStatus}/></li>)
  }

  return (
    <div>
      <h1 className='display-3 hover-shadow'>Guess the Word</h1>
      <div className='text-center'>
        <ul>{rowList}</ul>
        <div>{message}</div>
      </div>
    </div>
  )
}

export default App