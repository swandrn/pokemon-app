

export const createTable = async (db) => {
  try {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS pokemon (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            game_index INTEGER NOT NULL,
            name TEXT NOT NULL,
            primary_type TEXT NOT NULL,
            secondary_type TEXT,
            front_sprite TEXT NOT NULL,
            back_sprite TEXT NOT NULL,
            hp_stat INTEGER NOT NULL,
            attack_stat INTEGER NOT NULL,
            defense_stat INTEGER NOT NULL,
            special_attack_stat INTEGER NOT NULL,
            special_defense_stat INTEGER NOT NULL,
            speed_stat INTEGER NOT NULL
        );
    `);
    console.log("Table created successfully");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

export const getOwnedPokemons = async (db) => {
    const pokemonTableValues = await db.getAllAsync(
      `SELECT game_index, name, primary_type, secondary_type, front_sprite, back_sprite, 
              hp_stat, attack_stat, defense_stat, special_attack_stat, special_defense_stat, speed_stat, isShiny 
       FROM pokemon`
    );

    return pokemonTableValues;
};
