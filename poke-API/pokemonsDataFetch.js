export const fetchPokemonData = async (id, isShiny) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
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
    return pokemon;

  } catch (error) {
    console.error("Erreur lors de la récupération des données du Pokémon:", error);
    throw error;
  }
};
