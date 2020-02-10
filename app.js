const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
};

const pokedex_container = document.getElementById('pokedex-content')
const pokemon_number = 150
const main_types = Object.keys(colors)



const fetchPokemon = async () => {
  for (let i = 1; i <= pokemon_number; i++) {
    await catchPokemon(i)
  }
}


const catchPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const res = await fetch(url)
  const pokemon = await res.json()
  generatePokemon(pokemon)
}

const generatePokemon = (pokemon) => {
  const pokemonElement = document.createElement('div')
  pokemonElement.classList.add('pokemon')
  const pokemon_types = pokemon.types.map(element => element.type.name)
  const type = main_types.find(type => pokemon_types.indexOf(type) > -1)


  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)

  const html = `

    <div class="pokemonImage">
    <img src = "https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" />
    </div>

    <div class="info">
      <span class="pokemon-id>$ {pokemon.id}</span>
      <h3 class="pokemon-name">${name}</h3>
      <span class="pokemon-type">Type: ${pokemon_types.join(', ')}</span>
    </div>
  `



  pokemonElement.innerHTML = html
  pokedex_container.appendChild(pokemonElement)
}
fetchPokemon()