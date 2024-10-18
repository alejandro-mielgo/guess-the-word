import { useState } from 'react'

const Letter = ({ wordArray, index, getGuess, guessed }) => {

    const [boxStatus,setBoxStatus] = useState('empty')

    const readLetter = (event) => {
        let guess = event.target.value
        if (guess.length > 0) {
            event.target.value = guess.substr(0, 1);
            guess = guess.substr(0, 1)
        }
        event.target.nextSibling.focus()

        getGuess(index,guess)
        if(guess.toLowerCase() === wordArray[index].toLowerCase() ){
            setBoxStatus("green")
        } else if (wordArray.includes(guess)){
            setBoxStatus("yellow")
        } else {
           setBoxStatus("grey") 
        }

    }    
    return (
        <input className={`box ${guessed ? boxStatus : null}`}  onChange={readLetter} disabled={guessed} ></input>
    )  
}


const Row = ({ wordArray }) => {

    const [wordGuess, setWordGuess] = useState([...Array(wordArray.length)])
    const [guessed, setGuessed] = useState(false)

    const handleGuessButton = (event) => {
      
        if (wordGuess.some(letter =>letter==undefined) || wordGuess.some(letter =>letter=="")) { 
            alert('please fill all letter fields')
            return
        }

        setGuessed(true)
        if (wordArray.join('') === wordGuess.join('')) {
            console.log(wordArray)
            console.log(wordGuess)
            console.log("You Won!")
        }
    }

    const getGuess = (index,guessedLetter) =>{ //Extract a guess array from the Letter component
        const auxWordGuess = [...wordGuess]
        auxWordGuess[index] = guessedLetter
        setWordGuess( auxWordGuess )
    }

    return (
        <>
            {wordArray.map((letter, i) => <Letter wordArray={wordArray} key={i} index={i} getGuess={getGuess} guessed={guessed}/>)}
            
            <button 
            className="btn btn-secondary mx-3" 
            onClick={() => handleGuessButton(wordArray, wordGuess)} 
            disabled={guessed}>
                Guess
            </button>
        </>
    )
}

export default Row