export const getOwnedPokemons = async (db) => {
    const pokemonTableValues = await db.getAllAsync(
      `SELECT game_index, name, primary_type, secondary_type, front_sprite, back_sprite, 
              hp_stat, attack_stat, defense_stat, special_attack_stat, special_defense_stat, speed_stat, is_shiny, in_party, count 
       FROM pokemon`
    );

    return pokemonTableValues;
};
