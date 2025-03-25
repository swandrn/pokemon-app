export const fetchPokemonData = async (id, isShiny, url) => {
  try {
    const response = await fetch(url ? url : `https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    const moves = data.moves;
    const movesData = moves.map((move) => {
      return {
        name: move.move.name,
        url: move.move.url,
      };
    });

    const stats = data.stats;
    const statsData = stats.map((stat) => {
      return {
        base_stat: stat.base_stat,
        effort: stat.effort,
        stat: {
          name: stat.stat.name,
          url: stat.stat.url,
        },
      };
    });

    const pokemon = {
      game_index: data.id,
      name: data.name,
      types: {
        primary_type: data.types[0].type.name,
        secondary_type: data.types[1] ? data.types[1].type.name : undefined
      },
      front_sprite: isShiny ? data.sprites.front_shiny : data.sprites.front_default,
      back_sprite: isShiny ? data.sprites.back_shiny : data.sprites.back_default,
      species: data.species,
      moves: movesData,
      stats: statsData,
      is_shiny: isShiny,
    };
    if(!pokemon.back_sprite || !pokemon.front_sprite){
      const pokemonGameIndex = Math.floor(Math.random() * 898) + 1;
      fetchPokemonData(pokemonGameIndex, isShiny);
      return;
    } else{
      return pokemon;
    }

  } catch (error) {
    console.error("Erreur lors de la récupération des données du Pokémon:", error);
    throw error;
  }
};

export const fetchAllPokemons = async (page) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151&offset=${page * 151}`);
  const data = await response.json();
  return data;
};

export const fetchPokemonByType = async (type) => {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await response.json();
  const pokemon = data.pokemon.map((pokemon) => {
    return {
      name: pokemon.pokemon.name,
      url: pokemon.pokemon.url,
    };
  });
  return pokemon;
};

export const fetchPokemonDescription = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const data = await response.json();
  
  // Find the English flavor text entry
  const englishFlavorText = data.flavor_text_entries.find(
    entry => entry.language.name === 'en'
  );
  
  return englishFlavorText ? englishFlavorText.flavor_text : '';
};


