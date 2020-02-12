const colors = {
  fire: "#f20048",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5"
};

const pokedex_container = document.getElementById("pokedex-content");
const pokemon_number = 251;
const main_types = Object.keys(colors);

// FOR THE URL'S ITERATION

const fetchPokemon = async () => {
  for (let i = 1; i <= pokemon_number; i++) {
    await catchPokemon(i);
  }
};

// TO FETCH API

const catchPokemon = async id => {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  generatePokemon(pokemon);
};

// TEMPLATE OF OUR POKEMON CARDS

const generatePokemon = pokemon => {
  const pokemonElement = document.createElement("div");
  pokemonElement.classList.add("pokemon");
  const pokemon_types = pokemon.types.map(element => element.type.name);
  const type = main_types.find(type => pokemon_types.indexOf(type) > -1);

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = colors[type];

  pokemonElement.style.backgroundColor = color;
  const html = `

    <div class="pokemonImage" onclick="selectPokemon(${pokemon.id})">
    <img src = "https://pokeres.bastionbot.org/images/pokemon/${
      pokemon.id
    }.png" />
    </div>

    <div class="info" onclick="selectPokemon(${pokemon.id})">
      <span class="pokemon-id">${pokemon.id.toString().padStart(3, "0")}</span> 
      <h3 class="pokemon-name">${name}</h3>
      <p class="pokemon-type">Type: ${pokemon_types.join(", ")}</p>
    </div>
  `;

  pokemonElement.innerHTML = html;
  pokedex_container.appendChild(pokemonElement);
};

const selectPokemon = async id => {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  displayIndividual(pokemon);
};

const displayIndividual = pokemon => {
  const pokemon_types = pokemon.types.map(element => element.type.name);
  const type = main_types.find(type => pokemon_types.indexOf(type) > -1);
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = colors[type];

  const htmlString = `
  <div class="popup" style="background-color:${color}">
    <button class="close" onclick="closePopup()"><i class="fas fa-times fa-2x"></i></button>
    <div class="pokemonImage">
    <img src = "https://pokeres.bastionbot.org/images/pokemon/${
      pokemon.id
    }.png" />
    </div>

    <div class="info">
      <span class="pokemon-id">${pokemon.id.toString().padStart(3, "0")}</span> 
      <h3 class="pokemon-name">${name}</h3>
      <p class><span>Height: ${pokemon.height}</span> |
       <span>Weight: ${pokemon.weight}</span></p>
      <p><span>Base Experience: ${pokemon.base_experience}</span></p>
      <p class="pokemon-type">Type: ${pokemon_types.join(", ")}</p>
    </div>
  
 </div>
`;
  console.log(pokemon.version);
  pokedex_container.innerHTML = htmlString + pokedex_container.innerHTML;
};

const closePopup = () => {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);
};
//LOADING

const rotate = document.querySelector(".rotate");
setTimeout(() => {
  rotate.remove();
}, 1500);

fetchPokemon();
