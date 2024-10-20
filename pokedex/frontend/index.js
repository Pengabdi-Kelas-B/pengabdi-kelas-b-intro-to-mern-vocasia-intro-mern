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
      return "green";
    case "poison":
      return "purple";
    case "fire":
      return "red";
    case "water":
      return "blue";
    case "electric":
      return "yellow";
    case "psychic":
      return "pink";
    case "ice":
      return "blue";
    case "dragon":
      return "indigo";
    case "dark":
      return "gray";
    case "fairy":
      return "pink";
    default:
      return "gray";
  }
}

// Card component with border radius and adjusted type display
function PokemonCard(props) {
  return React.createElement(
    "div",
    {
      className:
        "bg-black border-2 border-red-600 rounded-lg shadow-lg p-4 m-2 text-center max-w-sm bg-opacity-90", // Card border in bright red
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
      { className: "text-2xl font-extrabold text-purple-600 mb-2" }, // Pokémon name in purple
      props.name
    ),    
    React.createElement(
      "div",
      { className: "flex flex-col justify-center items-center mt-2" },
      React.createElement(
        "p",
        { className: "text-lg text-gray-300" },
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
              className: `inline-block px-3 py-1 text-sm font-bold text-gray-100 bg-${typeColor(type)}-500 hover:bg-${typeColor(type)}-700 transition-colors duration-300 transform hover:scale-105`, // Solid hover effect on type with slight scaling
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
    { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" }, // Closer card spacing for up to 5 cards per row
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

// App component wrapping the header and list with updated colors
function App() {
  return React.createElement(
    "div",
    { className: "bg-gray-900 min-h-screen p-6" },
    React.createElement(
      "header",
      { className: "mb-10 text-center" },
      React.createElement(
        "h1",
        { className: "text-6xl font-extrabold text-purple-600 drop-shadow-lg" }, // Header text with shadow effect
        "Pokedex"
      ),
      React.createElement("div", { className: "relative mt-6 mb-4" }, // Adjusted separator spacing
        React.createElement("div", { className: "absolute inset-0 border-t-2 border-red-600" }), // Outer bright red separator line
        React.createElement("div", { className: "border-t-2 border-gray-600" }) // Inner separator line
      )
    ),
    React.createElement(PokemonList, null)
  );
}

// Function to render the app
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Initial render
renderApp();

// Fetch and display the Pokemon data
fetchPokemon();