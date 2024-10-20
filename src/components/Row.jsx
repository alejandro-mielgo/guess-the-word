import { useState } from 'react'

const Cell = ({ guessed, wordArray, index} ) =>{
    
    const [color, setColor] = useState(null)

    const readLetter = (event) => {
        let guess = event.target.value
        if (guess.length > 0) {
            event.target.value = guess.substr(0, 1);
            guess = guess.substr(0, 1)
        }

        if (guess.toLowerCase() === wordArray[index].toLowerCase()){
            setColor('green')
        } else if ( wordArray.includes(guess.toLowerCase()) ){
            setColor('yellow')
        } else {
            setColor('grey')
        }
    }

    const handleOnKeyUp = (event) => {
        console.log(event.target.value)
        if ( event.keyCode === 8 ) {
            try{
                event.target.previousSibling.focus()
            } catch {
            }       
        } else {
            event.target.nextSibling.focus()
        }
    }

    return(
        <>
            <input className={`box ${guessed?color:null}`}  onChange={readLetter} onKeyUp={(handleOnKeyUp)} disabled={guessed}></input>
        </>
        )
    
}

const Row = ({ wordArray, updateGameState }) => {


    const [guessed, setGuessed] = useState(false)

    const handleGuessButton = (event) =>{
        const newGuess=[]
        const boxes = Array.from(event.target.parentElement.querySelectorAll('input'))
        for (const box of boxes) {
            newGuess.push(box.value)
        }
        console.log('guess', newGuess)
        if (newGuess.includes('')){
            console.log('celda vacia')
            return
        }

        if(newGuess.join('').toLowerCase() === wordArray.join('').toLowerCase()) {
            console.log('you won')
            updateGameState('win')
        } else {
            updateGameState('playing')
        }
        setGuessed (true)
    }



    return (
        <div className="">
            <Cell guessed={guessed} wordArray={wordArray} index={0}/>
            <Cell guessed={guessed} wordArray={wordArray} index={1}/>
            <Cell guessed={guessed} wordArray={wordArray} index={2}/>
            <Cell guessed={guessed} wordArray={wordArray} index={3}/>
            <Cell guessed={guessed} wordArray={wordArray} index={4}/>
            <button 
            className="btn btn-secondary mx-3" 
            onClick={handleGuessButton}
            disabled={guessed}>
                Guess
            </button>
        </div>
    )
}

export default Row