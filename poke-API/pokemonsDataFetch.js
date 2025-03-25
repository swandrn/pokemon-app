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
    let front_sprite = data.sprites.front_default;
    let back_sprite = data.sprites.back_default;
    let front_shiny_sprite = data.sprites.front_shiny;
    let back_shiny_sprite = data.sprites.back_shiny;
    if(front_sprite === null){
      front_sprite = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd_7iNqXFmnew7Bm7bt-1N7_XIGm5Q_UWKcw&s";
    }
    if(back_sprite === null){
      back_sprite = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd_7iNqXFmnew7Bm7bt-1N7_XIGm5Q_UWKcw&s";
    }
    if(front_shiny_sprite === null){
      front_shiny_sprite = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd_7iNqXFmnew7Bm7bt-1N7_XIGm5Q_UWKcw&s";
    }
    if(back_shiny_sprite === null){
      back_shiny_sprite = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd_7iNqXFmnew7Bm7bt-1N7_XIGm5Q_UWKcw&s";
    }

    const pokemon = {
      game_index: data.id,
      name: data.name,
      types: {
        primary_type: data.types[0].type.name,
        secondary_type: data.types[1] ? data.types[1].type.name : undefined
      },
      front_sprite: isShiny ? front_shiny_sprite : front_sprite,
      back_sprite: isShiny ? back_shiny_sprite : back_sprite,
      species: data.species,
      moves: movesData,
      stats: statsData,
      is_shiny: isShiny,
    };
    if(!pokemon.back_sprite || !pokemon.front_sprite){
      fetchPokemonData();
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
  console.log(id);
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  if(response.status === 404){
    return 'So mysterious...';
  }
  const data = await response.json();
 
  // Find the English flavor text entry
  const englishFlavorText = data.flavor_text_entries.find(
    entry => entry.language.name === 'en'
  );
 
  return englishFlavorText ? englishFlavorText.flavor_text : '??????????';
};


