const pokedexContainer = document.getElementById('pokedex')

// Get unique Pokémon types
const types = Array.from(new Set(pokedex.flatMap(pokemon => pokemon.type)))

// Create a navbar element
const navBar = document.createElement('nav')
navBar.classList.add('navbar')

// Create an unordered list element
const navList = document.createElement('ul')
navList.classList.add('navbar-nav')

// Create a list item for each type and add an anchor element to it
types.forEach(type => {
  const listItem = document.createElement('li')
  const anchor = document.createElement('a')
  anchor.href = `#${type.toLowerCase()}`
  anchor.textContent = type
  anchor.classList.add('nav-link')
  listItem.appendChild(anchor)
  navList.appendChild(listItem)
})

// Append the unordered list to the navbar
navBar.appendChild(navList)

// Append the navbar to the Pokédex container
pokedexContainer.insertBefore(navBar, pokedexContainer.firstChild)

// Create an array of objects containing information about each type
const typeData = types.map(type => {
  const pokemonOfType = pokedex.filter(pokemon => pokemon.type.includes(type))
  const totalPokemon = pokemonOfType.length
  const totalHP = pokemonOfType.reduce((acc, pokemon) => acc + pokemon.base.HP, 0)
  const totalAttack = pokemonOfType.reduce((acc, pokemon) => acc + pokemon.base.Attack, 0)

  return {
    type,
    totalPokemon,
    totalHP,
    totalAttack
  }
})

// Sort the typeData array alphabetically by type name
typeData.sort((a, b) => a.type.localeCompare(b.type))

// Create a section for each type and append it to the Pokédex container

typeData.forEach(({ type, totalPokemon, totalHP, totalAttack }) => {
  // Create the section heading
  const heading = document.createElement('h2')
  heading.textContent = `${type} (${totalPokemon}) - Total HP: ${totalHP} - Total Attack: ${totalAttack}`

  // Create the section div
  const sectionDiv = document.createElement('div')
  sectionDiv.classList.add('type-section')
  sectionDiv.id = type.toLowerCase()

  // Filter the pokedex to get only the Pokémon with the current type
  const pokemonOfType = pokedex.filter(pokemon => pokemon.type.includes(type))

  // Create a div for each Pokémon and append it to the section div
  pokemonOfType.forEach(pokemon => {
    const pokemonDiv = document.createElement('div')
    pokemonDiv.classList.add('pokemon')

    const nameHeading = document.createElement('h3')
    nameHeading.textContent = pokemon.name

    const spriteImg = document.createElement('img')
    spriteImg.src = pokemon.sprite
    spriteImg.alt = `${pokemon.name} sprite`

    // Create link on image in a new window
    const pokemonLink = document.createElement('a')
    pokemonLink.href = pokemon.url
    pokemonLink.target = '_blank'
    pokemonLink.appendChild(spriteImg)

    const typesParagraph = document.createElement('p')
    typesParagraph.textContent = `Type: ${pokemon.type.join(', ')}`

    const baseStatsParagraph = document.createElement('p')
    baseStatsParagraph.innerHTML = `Base Stats: <ul>
      <li>HP: ${pokemon.base.HP}</li>
      <li>Attack: ${pokemon.base.Attack}</li>
      <li>Defense: ${pokemon.base.Defense}</li>
      <li>Sp. Attack: ${pokemon.base['Sp. Attack']}</li>
      <li>Sp. Defense: ${pokemon.base['Sp. Defense']}</li>
      <li>Speed: ${pokemon.base.Speed}</li>
    </ul>`

    pokemonDiv.appendChild(pokemonLink)
    pokemonDiv.appendChild(nameHeading)
    pokemonDiv.appendChild(typesParagraph)
    pokemonDiv.appendChild(baseStatsParagraph)
    sectionDiv.appendChild(pokemonDiv)
  })

  // Append the heading and section div to the Pokédex container
  pokedexContainer.appendChild(heading)
  pokedexContainer.appendChild(sectionDiv)
})
