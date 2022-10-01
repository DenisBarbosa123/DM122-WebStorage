import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

const db = new Dexie("pokemonDB");

db.version(1).stores({
  pokemon: "++id,name",
});

db.on("populate", async () => {
  await db.pokemon.bulkPut([
    {
      name: "Bulbasaur",
      picture:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    },
    {
      name: "Charmander",
      picture:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    },
    {
      name: "Squirtle",
      picture:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    },
    {
      name: "Pikachu",
      picture:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    },
  ]);
});

db.open();

const pokemonList = await db.pokemon.toArray()
console.log(pokemonList)

const pokeHTML = pokemonList.map(toHTML).join('');
document.body.innerHTML = pokeHTML;
function toHTML(poke) {
    return `
     <section>
        <div class="card-wrapper">
            <div class="card">
                <div class="card-id">${poke.id}</div>
                <div class="card-image">
                    <img alt="${poke.name}" src="${poke.picture}">
                </div>
            </div>
            <div class="card-name">
            ${poke.name}
            </div>
        </div>
     </section>
    `;
}