import { useState, useRef, useEffect } from 'react'
import InputBar from './components/InputBar/InputBar'
import Heading from './components/Heading/Heading'
import WordList from './components/WordList/WordList'
import GameModal from './components/UI/Modal/Modal'
import jsonData from './wordBank.json'
import './styles/reset.scss'
import './App.scss'

const shuffleWords = (array: string[]): string[] => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledWords: string[] = shuffleWords(jsonData)
const INITIAL_WORDS = shuffledWords.splice(0, 5)
const INITIAL_SCORE = 0
const GAME_TIMER = 5000 // 60s
const modalWelcomeContent = 'Once game starts, your job is to correctly type as many words as possible. \n The words will appear above your input and you should type on of them. \n Each game lasts 60 seconds'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const handleStartGame = (isRestart: boolean) => {
    if (!isRestart) {
      setGameStarted(true)
    }
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    setCurrentScore(INITIAL_SCORE)
    setTime(GAME_TIMER)
  }
  const inputRef = useRef<HTMLInputElement>(null)
  const [score, setCurrentScore] = useState(INITIAL_SCORE)
  const [time, setTime] = useState(GAME_TIMER)
  const [currentWords, setCurrentWords] = useState(INITIAL_WORDS)
  const modalFinishedContent = `Your score is ${score}, practice makes perfect`
  
  const handleFinishedWord = (word: string) => {
    const wordIndex = currentWords.indexOf(word.trim())

    if (wordIndex !== -1) {
      const nextWord = shuffledWords.shift()!
      const newArray = [...currentWords]
      newArray[wordIndex] = nextWord
      setCurrentScore((prevScore) => prevScore + 1)
      setCurrentWords(newArray)
    }
  }

  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [gameStarted])


  useEffect(() => {
    let interval: any

    if (gameStarted) {
      interval = setInterval(() => {  
        setTime((prevTime) => prevTime - 1000)       
      }, 1000);
    }
    if (time === 0) {
      setGameStarted(false)
    }

    return () => clearInterval(interval)
  }, [gameStarted, time])

  const renderModal = () => {
    if (time === 0) {
      return <GameModal content={modalFinishedContent} title={'Times up!'} onConfirm={() => handleStartGame(true)}/> 
    }
    if (!gameStarted) {
      return <GameModal content={modalWelcomeContent} title={'Welcome'} onConfirm={() => handleStartGame(false)}/> 
    }
    return null
  }

  return (
    <div className="App">
      { renderModal() }
      <Heading score={score} time={time}/>
      <WordList currentWords={currentWords}/>
      <InputBar handleFinishedWord={handleFinishedWord} ref={inputRef}/>
      <h2 className="motivation">Start Typing!</h2>
    </div>
  );
}

export default App;
