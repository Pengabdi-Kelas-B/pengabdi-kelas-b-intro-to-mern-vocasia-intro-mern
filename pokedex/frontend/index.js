let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("HTTP call failed");
    }
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    renderApp();
  }
}

// Card component
function PokemonCard(props) {
  return React.createElement(
    "div",
    {
      className: "w-64 h-80 m-4 p-4 border-2 border-gray-800 rounded-lg bg-yellow-100 shadow-lg flex flex-col items-center",
    },
    React.createElement("img", {
      src: props.image,
      alt: props.name,
      className: "w-24 h-24 mb-2",
    }),
    React.createElement(
      "h2",
      { className: "text-xl font-semibold text-gray-800 mb-1" },
      props.name
    ),
    React.createElement(
      "p",
      { className: "text-sm italic text-gray-600" },
      `Type: ${props.types}`
    )
  );
}

// List component
function PokemonList() {
  if (pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center text-gray-800" },
      "Loading Pokemon data..."
    );
  }

  return React.createElement(
    "div",
    { className: "flex flex-wrap justify-center" },
    pokemonData.map((pokemon) =>
      React.createElement(PokemonCard, {
        key: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.join("/"),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      })
    )
  );
}

// App component wrap header and list
function App() {
  return React.createElement(
    "div",
    { className: "p-6 bg-gray-100 min-h-screen" },
    React.createElement(
      "header",
      { className: "mb-6" },
      React.createElement(
        "h1",
        { className: "text-4xl text-center font-bold text-gray-800 underline mb-4" },
        "Classic Pokedex"
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
