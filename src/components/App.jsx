import {useEffect, useState} from 'react'
import Cards from "./Cards.jsx";
import AOT from '../resources/aot.jpg'

function App() {
  const [currentScore, setCurrentScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [characters, setCharacters] = useState([])
  const numCards = 12

  function selectRandomCharacters(characters) {
    let randomCharacters = []

    for (let i = 0; i < numCards; i++) {
      let random
      do {
        random = Math.floor(Math.random() * (characters.length + 1))
      } while (characters[random]?.img===undefined)

      let index = characters[random].img.indexOf('.png');
      randomCharacters.push({
        id: characters[random].id,
        name: characters[random]?.name,
        img: characters[random].img.substring(0, index+4),
      })
      characters.splice(random, 1)
    }
    return randomCharacters
  }

  useEffect(() => {
    fetch(
      "https://api.attackontitanapi.com/characters",
      {mode: "cors"}
    ).then((response) => response.json()
    ).then((response) => {
      let characters = selectRandomCharacters(response.results)
      setCharacters(characters)
    })
  }, []);

  function randomizeCharacters() {
    setCharacters(selectRandomCharacters(characters))
  }

  function increaseScore() {
    setCurrentScore(currentScore+1)
    if (currentScore+1 > bestScore) {
      setBestScore(currentScore+1)
    }
  }

  function clearScore() {
    setCurrentScore(0)
  }

  return (
    <div className="bg-aot bg-cover bg-center bg-no-repeat w-screen h-screen">
      <p className="font-mono text-white text-5xl font-bold p-6">Attack on Titan Memory Game</p>
      <div className="flex">
        <p className="text-white text-xl p-3 flex items-center">Get points by clicking on an image but don't click on
          any more than once!</p>
        <div className="flex flex-auto justify-end gap-5 text-white font-bold">
          <p className="flex items-center">Current score: {currentScore}</p>
          <p className="mr-20 flex items-center">Best score: {bestScore}</p>
        </div>
      </div>
      <p className={`transition-opacity flex justify-center font-bold font-mono text-4xl text-white p-5 ${(currentScore===0 && bestScore!==0) ? "opacity-100":"opacity-0"}`}>
        You lost! Click on a card to start again.
      </p>
      <div className="flex flex-col justify-center flex-auto pl-6 pr-6">
        <Cards characters={characters} randomizeCharacters={randomizeCharacters} increaseScore={increaseScore}
               clearScore={clearScore}></Cards>
      </div>
    </div>
  )
}

export default App
