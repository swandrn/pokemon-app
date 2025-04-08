import { createNameTable, createOwnedPokemonTable } from "./models";

export const getOwnedPokemons = async (db) => {
    const pokemonTableValues = await db.getAllAsync(
      `SELECT id, game_index, name, primary_type, secondary_type, front_sprite, back_sprite, 
              hp_stat, attack_stat, defense_stat, special_attack_stat, special_defense_stat, speed_stat, is_shiny, in_party, count 
       FROM pokemon`
  );

  return pokemonTableValues;
};

export const getAllPokemons = async (db) => {
  const nameTableValues = await db.getAllAsync(`SELECT name, url FROM name`);
  return nameTableValues;
};

export const fillNameTable = async (db) => {
  const nameTableValues = await getAllPokemons(db);
  try {
    const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000");
    const json = await data.json();
    const nameTableValues = json.results.map((pokemon) => ({
      name: pokemon.name,
      url: pokemon.url,
    }));
    nameTableValues.forEach(async (pokemon) => {
      db.getFirstAsync(`SELECT name FROM name WHERE name = ?`, [pokemon.name]).then((value) => {
        if (!value) {
          db.runAsync(
            `
    INSERT INTO name (name, url) VALUES (?, ?);
   `,
            [pokemon.name, pokemon.url]
          );
        } else {
          console.log("pokemon already exists", pokemon);
        }
      });
    });
    console.log("fillNameTable completed");
  } catch (error) {
    console.error("Error filling name table:", error);
  }
};

export const initializeDB = async (db) => {
  try {
    await createOwnedPokemonTable(db);
    await createNameTable(db);
    const allPokemons = await getAllPokemons(db);
    console.log("allPokemons length", allPokemons.length);
    if (allPokemons.length < 100) {
      console.log("fillNameTable triggered");
      fillNameTable(db);
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};
