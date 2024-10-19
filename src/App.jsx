import { useState, useEffect } from 'react'
import Row from './components/Row'
  
function App() {
  const [ wordArray, setWordArray ] = useState([])
  const nRows = 6
  const [ tries, setTries ] = useState(0)
  const [ message, setMessage ] = useState("You have 6 tries to guess the word")
  
  const fetchData = () =>{
    const url = `https://random-word-api.herokuapp.com/word?length=5`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setWordArray(data[0].split(''))
      })
  }
  useEffect(() =>{
    fetchData()
  },[])


  
  const updateGameStatus = (status) => {
    const aTries = tries + 1
    setTries(aTries)
    console.log('tries:',aTries)
    if (aTries===nRows) {
      setMessage("You lost")
    } else {
      setMessage (status==="win" ? "You won!" : `Wrong guess ${aTries}/${nRows} `)
    }
  }

  const rowList = []
  for (let i=0; i < nRows; i++ ){
    rowList.push(<li key={`li${i}`}><Row wordArray={wordArray} key={`row_${i}`} id={`row_${i}`} updateGameStatus={updateGameStatus}/></li>)
  }


  return (
    <div>
      <h1 className='display-3 hover-shadow'>Guess the Word</h1>
      <p className="text-center">{} </p>
      <div className='text-center'>
        <ul>{rowList}</ul>
        <div><p className='message'>{message}</p></div>
      </div>
    </div>
  )
}

export default App