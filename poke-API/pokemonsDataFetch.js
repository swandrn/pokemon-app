export const fetchPokemonData = async (id) => {
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
      id: 0,
      game_index: id,
      name: data.name,
      types: data.types,
      sprites: {
        front: data.sprites.front_default,
        back: data.sprites.back_default,
      },
      species: data.species,
      moves: movesData,
      stats: statsData,
    };
    return pokemon;

  } catch (error) {
    console.error("Erreur lors de la récupération des données du Pokémon:", error);
    throw error;
  }
};
