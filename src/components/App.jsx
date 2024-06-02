import {useEffect, useState} from 'react'
import Characters from './characters.json'
import Cards from "./Cards.jsx";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [currentScore, setCurrentScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [characters, setCharacters] = useState([])
  const numCards = 10

  function selectRandomCharacters(characters) {
    let randomCharacters = []

    for (let i = 0; i < numCards; i++) {
      let random = Math.floor(Math.random() * (characters.length+1))
      randomCharacters.push({
        key: uuidv4(),
        name: characters[i].name,
        img: characters[i].img,
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
      console.log(characters)
    })
  }, []);

  return (
    <>
      <Cards characters={characters}></Cards>
    </>
  )
}

export default App
