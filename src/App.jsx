import React from "react"
import {languages} from "./languages"
import clsx from 'clsx';
function App() {
  const [currentWord , setCurrentWord] = React.useState("react")
  const [guessedLetters,setGuessedLetters]=React.useState([])
  const [wrongGuesses , setWrongGuesses] = React.useState(0)
  const isGameLost= wrongGuesses>=8
  const isGameWon = currentWord.toUpperCase().split("").every((letter)=>{
    return guessedLetters.includes(letter)
  })
  console.log(wrongGuesses);
  
  
  
  const isGameOver= isGameLost || isGameWon
  
  const sectionBg = clsx("game-status",{
    correct:isGameWon,
    wrong:isGameLost
  })
  const codeLanguages = languages.map((language,index)=>{
    const lostLanguage = clsx("chip",{
            lost:index<wrongGuesses
        })
    const styles ={
      backgroundColor:language.backgroundColor,
      color:language.color
    }
    return(
      <span style={styles} className={lostLanguage} key={language.name}>{language.name}</span>
    )
  })
  const letters = currentWord.toUpperCase().split("")
  const wordDis =letters.map((letter,index)=>{
    const isCorrect=guessedLetters.includes(letter) && currentWord.toUpperCase().includes(letter)
    return(
      <span key={index}>{isCorrect?letter:""}</span>
    )
  })

  function handleClick(key){
    if(guessedLetters.includes(key)){
      return;
    }
    setGuessedLetters((prevGuessed)=>{
      return(prevGuessed.includes(key) ? prevGuessed:[...prevGuessed , key])
    })
    
      setWrongGuesses((prev)=>{
        return currentWord.toUpperCase().includes(key)?prev:prev+1
      })
   
    
  }

  

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const keys = alphabet.toUpperCase().split("")
  const keyboardElements = keys.map((key)=>{
    const isGuessed = guessedLetters.includes(key)
    const isCorrect = isGuessed && currentWord.toUpperCase().includes(key)
    const isWrong = isGuessed && !currentWord.toUpperCase().includes(key)
    const className = clsx({
            correct: isCorrect,
            wrong: isWrong,
            
        })
    
    return <button className={className} key={key} onClick={()=>{handleClick(key)}}>{key}</button>
  })

  function renderGameStatus() {
        if (!isGameOver) {
            return null
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        } else {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }
    }




  return(
    <main>
      <header>
      <h1>Assembly: Endgame</h1>
      <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly</p>
      </header>
      <section className={sectionBg}>
        {/* {isGameOver? isGameWon && <h2>You Win!</h2> : isGameLost &&<h2>Game Over!</h2>} */}
        {/* {isGameOver? isGameWon && <p>Well Done!🎉</p> : isGameLost &&<p>You loose, better start learning Assembly</p>} */}
        {/* {isGameWon?  <h2>You Win!</h2> : isGameLost&& <h2>Game Over!</h2>}
        {isGameWon?  <p>Well Done!🎉</p> :isGameLost && <p>You loose, better start learning Assembly</p>} */}
        {renderGameStatus()}
        
      </section>
      <section className="language-chips">
        {codeLanguages}
      </section>
      <section className="word">
        {wordDis}
      </section>
      <section className="keyboard">
        {keyboardElements}
      </section>
      {isGameOver&&<button className="new-game">New Game</button>}
    </main>
  )
}

export default App
