let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("HTTP request failed");
    }
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    renderApp();
  }
}

// Function to map Pokemon types to color classes
function typeColor(type) {
  switch (type) {
    case "grass":
      return "green-600";  // Dark green
    case "poison":
      return "purple-600";  // Dark purple
    case "fire":
      return "orange-600";  // Dark orange
    case "water":
      return "blue-600";  // Dark blue
    case "electric":
      return "yellow-600";  // Dark yellow
    case "psychic":
      return "pink-600";  // Dark pink
    case "ice":
      return "teal-600";  // Dark teal
    case "dragon":
      return "indigo-600";  // Dark indigo
    case "dark":
      return "gray-800";  // Dark gray
    case "fairy":
      return "pink-500";  // Soft pink
    default:
      return "gray-500";  // Default gray
  }
}

// Card component with border radius and adjusted type display
function PokemonCard(props) {
  return React.createElement(
    "div",
    {
      className:
        "bg-white border-2 border-green-700 rounded-lg shadow-lg p-4 m-2 text-center max-w-sm bg-opacity-90", // Card border in dark green
    },
    React.createElement("div", { className: "overflow-hidden mb-2" },
      React.createElement("img", {
        className:
          "w-full max-h-32 object-contain transition-transform duration-300 hover:-translate-y-4", // Pokémon jumping effect on hover
        src: props.image,
        alt: props.name,
      })
    ),
    React.createElement(
      "h2",
      { className: "text-2xl font-extrabold text-green-700 mb-2" }, // Pokémon name in dark green
      props.name
    ),    
    React.createElement(
      "div",
      { className: "flex flex-col justify-center items-center mt-2" },
      React.createElement(
        "p",
        { className: "text-lg text-gray-800" },
        "Type:"
      ),
      React.createElement(
        "div",
        { className: "flex justify-center space-x-2 mt-1" },
        props.types.map((type) =>
          React.createElement(
            "span",
            {
              key: type,
              className: `inline-block px-3 py-1 text-sm font-bold text-gray-100 bg-${typeColor(type)} hover:bg-${typeColor(type)}-700 transition-colors duration-300 transform hover:scale-105`, // Solid hover effect on type with slight scaling
            },
            type
          )
        )
      )
    )
  );
}

// List component with grid layout for closer card spacing
function PokemonList() {
  if (pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center text-xl mt-10 text-gray-300" },
      "Loading Pokemon data..."
    );
  }

  return React.createElement(
    "div",
    { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" }, 
    pokemonData.map((pokemon) =>
      React.createElement(PokemonCard, {
        key: pokemon.id,
        name: pokemon.name,
        types: pokemon.types,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      })
    )
  );
}


function App() {
  return React.createElement(
    "div",
    { className: "bg-gray-900 min-h-screen p-6" },
    React.createElement(
      "header",
      { className: "mb-10 text-center" },
      React.createElement(
        "h1",
        { className: "text-6xl font-extrabold text-green-700 drop-shadow-lg" }, 
        "Pokedex"
      ),
      React.createElement("div", { className: "relative mt-6 mb-4" }, 
        React.createElement("div", { className: "absolute inset-0 border-t-2 border-green-700" }), 
        React.createElement("div", { className: "border-t-2 border-gray-600" }) 
      )
    ),
    React.createElement(PokemonList, null)
  );
}


function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}


renderApp();

fetchPokemon();