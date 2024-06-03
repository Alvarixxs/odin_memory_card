import {useState} from "react";


function Cards({ characters, randomizeCharacters, increaseScore, clearScore }) {
  const [charactersSelected, setCharactersSelected] = useState([]);

  function selectCharacter(character) {
    randomizeCharacters()
    let newCharacters = charactersSelected.filter((characterCur) => characterCur.id !== character.id)
    console.log(newCharacters)
    if (newCharacters.length !== charactersSelected.length) {
      clearScore()
      setCharactersSelected([])
    }
    else {
      newCharacters.push(character);
      setCharactersSelected(newCharacters);
      increaseScore()
    }
  }

  return (
    <div className="grid grid-cols-6 gap-5 lg:">
      {characters.map((character) =>
        <Card key={character.id} character={character} selectCharacter={selectCharacter}>
        </Card>
      )}
    </div>
  )
}

function Card({ character,selectCharacter }) {
  return (
    <div className="flex flex-col gap-2 transition-all relative hover:cursor-pointer active:rotate-2 active:scale-95" onClick={()=>selectCharacter(character)}>
      <img className="rounded-xl " src={character.img} alt=""/>
      <p className="align-middle text-center mb-2 font-bold text-white absolute bottom-0 left-1/2 -translate-x-2/4 -translate-y-2/4">{character.name}</p>
    </div>
  )
}

export default Cards