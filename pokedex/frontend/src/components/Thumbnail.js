import React from "react";

const Thumbnail = ({ pokemon, isFlipped, onFlip }) => {
  const typeColors = {
    rock: "bg-[#fffbeb]",
    ghost: "bg-[#f7f7f7]",
    electric: "bg-[#ffffa1]",
    bug: "bg-[#f6d6a7]",
    poison: "bg-[#ede9fe]",
    normal: "bg-[#f4f4f4]",
    fairy: "bg-[#fbcfe8]",
    fire: "bg-[#fee2e2]",
    grass: "bg-[#e2f9e1]",
    water: "bg-[#e0f1fd]",
    dragon: "bg-[#e0e7ff]",
    ground: "bg-[#fed7aa]",
    fighting: "bg-[#e5e5e5]",
    psychic: "bg-[#FBE3DF]",
    ice: "bg-[#bae6fd]",
    flying: "bg-[#E0F1FD]",
    steel: "bg-[#F4F4F4]",
    dark: "bg-[#f1f5f9]",
  };

  return (
    <div onClick={onFlip}>
      {!isFlipped ? (
        <div
          className={`flex flex-col items-center justify-center p-6 m-1 border border-gray-200 rounded-[10px] w-[200px] text-center shadow-md h-[300px] transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-lg ${
            typeColors[pokemon.types[0]]
          }`}
        >
          <div className="rounded-xl p-1 bg-white/30 mb-2">
            <small className="capitalize">#0{pokemon.id}</small>
          </div>
          <img
            className="w-full h-[150px] mb-2 object-contain"
            src={pokemon.image}
            alt={pokemon.name}
          />
          <div className="flex flex-col w-full">
            <h3 className="font-bold mb-2 capitalize">{pokemon.name}</h3>
            <small className="capitalize">{pokemon.types[0]}</small>
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-col items-center justify-center p-6 m-1 border border-gray-200 rounded-[10px] w-[200px] shadow-md h-[300px] transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-lg ${`${
            typeColors[pokemon.types[0]]
          } bg-opacity-50`}`}
        >
          <h3 className="font-bold mb-2">Additional Info</h3>
          <p>Weight: {pokemon.weight} kg</p>
          <p>Height: {pokemon.heigh} cm</p>
          <div className="mt-2">
            <h4 className="font-semibold mb-1">Abilities:</h4>
            <ul className="list-disc list-inside">
              {pokemon.abilities.slice(0, 3).map((ability, index) => (
                <li key={index} className="capitalize">
                  {ability}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Thumbnail;
