const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="openPokemonDetailsByNumber(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function openPokemonDetailsByNumber(number) {

    pokeApi.getPokemonDetailsByNumber(number).then((pokemon) => {

        document.getElementById("pokemon-list").style.display = "none";

        document.getElementById("pokemon-detail-part-1").className = pokemon.type;
        
        document.getElementById("detail-name").innerHTML = pokemon.name;
        
        document.getElementById("detail-number").innerHTML = "#" + (pokemon.number + "").padStart(3, '0');

        document.getElementById("detail-types").innerHTML = pokemon.types.map((type) => `<span class="${type}">${type}</span>`).join('');

        document.getElementById("detail-photo").src = pokemon.photo;

        document.getElementById("detail-height").innerHTML = pokemon.height + " cm";

        document.getElementById("detail-weight").innerHTML = pokemon.weight + " kg";

        document.getElementById("detail-abilities").innerHTML = pokemon.abilities.join(', ');

        document.getElementById("pokemon-detail").style.display = "block";

    })

}

function closePokemonDetails() {
    document.getElementById("pokemon-detail").style.display = "none";
    document.getElementById("pokemon-list").style.display = "block";
}
