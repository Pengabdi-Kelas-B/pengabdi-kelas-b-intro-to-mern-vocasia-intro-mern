let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("http call failed");
    }
    const data = await response.json();
    pokemonData = data; // Menyimpan data langsung dari response
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    renderApp(); // Render in case of error to show message
  }
}

// Card component
function PokemonCard(props) {
  return React.createElement(
    "div",
    { className: "bg-white p-4 rounded-lg shadow-md m-4 max-w-xs text-center" },
    React.createElement("h2", { className: "text-xl font-bold mt-2" }, props.name)
  );
}

// List component
function PokemonList() {
  if (pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center text-gray-500" },
      "Loading Pokemon data..."
    );
  }

  return React.createElement(
    "div",
    { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" },
    pokemonData.map((pokemon) =>
      React.createElement(PokemonCard, {
        key: pokemon.name, // Menggunakan nama sebagai key
        name: pokemon.name // Hanya menampilkan nama
      })
    )
  );
}

// App component wrap header and list
function App() {
  return React.createElement(
    "div",
    { className: "bg-gray-100 min-h-screen" },
    React.createElement(
      "header",
      { className: "bg-green-800 p-6" },
      React.createElement(
        "h1",
        { className: "text-4xl text-center font-bold text-white" },
        "Pokedex"
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
