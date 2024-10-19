const fs = require("fs");
const { types } = require("util");
const axios = require("axios").default;

async function generateJsonDB() {
  // TODO: fetch data pokemon api dan buatlah JSON data sesuai dengan requirement.
  // json file bernama db.json. pastikan ketika kalian menjalankan npm run start
  // dan ketika akses url http://localhost:3000/pokemon akan muncul seluruh data
  // pokemon yang telah kalian parsing dari public api pokemon
  const pokemonApiURL =
    "https://pokeapi.co/api/v2/pokemon/?offset=100&limit=100";

  const response = await axios.get(pokemonApiURL);
  const pokemonData = response.data.results;
  let data = [];
  for (const item of pokemonData) {
    const detailRes = await axios.get(item.url);
    const detail = detailRes.data;
    let types = [];
    let abilities = [];
    for (const type of detail.types) {
      types.push(type.type.name);
    }
    for (const ability of detail.abilities) {
      abilities.push(ability.ability.name);
    }
    data.push({
      id: detail.id,
      name: item.name,
      types: types,
      abilities: abilities,
      heigh: detail.height,
      weight: detail.weight,
      cries: detail.cries,
    });
    types = [];
    abilities = [];
  }
  console.log(data);
  const json = JSON.stringify({ data }, null, 2);
  fs.writeFileSync("db.json", json);
}

generateJsonDB();
