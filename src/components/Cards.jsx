

function Cards({ characters }) {
  return (
    <div>
      {characters.map((character) =>
        <Card key={character.key} character={character}>
        </Card>
      )}
    </div>
  )
}

function Card({ character }) {
  console.log(character)
  return (
    <div className="card">
      <img src={character.img} alt=""/>
      <p>{character.name}</p>
    </div>
  )
}

export default Cards