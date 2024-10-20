import { useEffect, useState } from "react";
import axios from "axios";
import Thumbnail from "./components/Thumbnail";

function App() {
  const name = "Pokedex App";
  const url = "http://localhost:3300/data";
  const [pokemons, setPokemons] = useState([]);
  const getPokemons = async () => {
    const response = await axios.get(url);
    setPokemons(response.data);
  };
  useEffect(() => {
    getPokemons();
  }, []);

  const [flippedId, setFlippedId] = useState(null);
  const handleFlip = (id) => {
    setFlippedId(flippedId === id ? null : id);
  };
  return (
    <div className="font-poppins flex flex-col items-center justify-center min-h-screen py-12 px-2">
      <h1 className="text-4xl font-bold mb-7">{name}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {pokemons.map((pokemon) => (
          <Thumbnail
            key={pokemon.id}
            pokemon={pokemon}
            isFlipped={flippedId === pokemon.id}
            onFlip={() => handleFlip(pokemon.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
