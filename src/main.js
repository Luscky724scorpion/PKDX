const pokedex = document.getElementById("pokedex");

const typeGenerations = {
  fire: {
    gen1: "charmander",
    gen2: "cyndaquil",
    gen3: "torchic",
  },
  water: {
    gen1: "squirtle",
    gen2: "totodile",
    gen3: "mudkip",
  },
  grass: {
    gen1: "bulbasaur",
    gen2: "chikorita",
    gen3: "treecko",
  },
};

// Global variable to store fetched Pokémon
let allStarters = [];

// Fetch Pokémon data from API
const fetchPokemon = async () => {
  const starterIds = [1, 4, 7, 152, 155, 158, 252, 255, 258];

  try {
    const responses = await Promise.all(
      starterIds.map((id) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`))
    );

    const data = await Promise.all(responses.map((res) => res.json()));

    allStarters = data.map((pokemon) => ({
      name: pokemon.name,
      id: pokemon.id,
      image: pokemon.sprites.front_default,
      type: pokemon.types.find((t) =>
        ["fire", "water", "grass"].includes(t.type.name)
      )?.type.name,
      generation: `gen${Math.floor((pokemon.id - 1) / 151) + 1}`,
    }));

    displayPokemon(allStarters);
    initializeForm();
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
};

// Form handling
const initializeForm = () => {
  const form = document.getElementById("starterForm");
  const typeSelection = document.getElementById("typeSelection");
  const genSelection = document.getElementById("genSelection");

  // Populate generation options
  genSelection.innerHTML = Object.keys(typeGenerations.fire)
    .map((gen) => `<option value="${gen}">${gen.toUpperCase()}</option>`)
    .join("");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedType = typeSelection.value;
    const selectedGen = genSelection.value;

    if (!selectedType) {
      alert("Please select a Pokémon type!");
      return;
    }

    const filtered = allStarters.filter(
      (pokemon) =>
        pokemon.type === selectedType &&
        pokemon.name === typeGenerations[selectedType][selectedGen]
    );

    displayPokemon(filtered);
  });
};

// Display function
const displayPokemon = (pokemon) => {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML =
    pokemon.length > 0
      ? pokemon
          .map(
            (p) => `
        <div class="pokemon-card">
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name.charAt(0).toUpperCase() + p.name.slice(1)}</h3>
          <p>Type: ${p.type}</p>
          <p>Generation: ${p.generation}</p>
        </div>
      `
          )
          .join("")
      : "<p>No Pokémon found for this selection</p>";
};

// Initialize
fetchPokemon();
