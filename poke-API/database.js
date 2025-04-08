import { createNameTable, createOwnedPokemonTable, createItemTypeTable, createGatchaItemTable, ItemTypeTable, GatchaItemTable } from "./models";

export const getOwnedPokemons = async (db) => {
  const pokemonTableValues = await db.getAllAsync(
    `SELECT game_index, name, primary_type, secondary_type, front_sprite, back_sprite, 
              hp_stat, attack_stat, defense_stat, special_attack_stat, special_defense_stat, speed_stat, is_shiny, in_party, count 
       FROM pokemon`
  );

  return pokemonTableValues;
};

export const getAllPokemons = async (db) => {
  const nameTableValues = await db.getAllAsync(`SELECT name, url FROM name`);
  return nameTableValues;
};

export const getItemTypes = async (db) => {
  const itemTypeTableValues = await db.getAllAsync(`SELECT id, name FROM item_type`);
  return itemTypeTableValues;
};

export const getAllGatchaItems = async (db) => {
  const gatchaItemTableValues = await db.getAllAsync(`SELECT gatcha_item.id, gatcha_item.name, gatcha_item.description, gatcha_item.quantity, gatcha_item.price, item_type.name as item_type_name FROM gatcha_item JOIN item_type ON gatcha_item.item_type_id = item_type.id`);
  return gatchaItemTableValues;
};

export const getOwnedGatchaItems = async (db) => {
  const ownedGatchaItemTableValues = await db.getAllAsync(`SELECT gatcha_item.id, gatcha_item.name, gatcha_item.description, gatcha_item.quantity, gatcha_item.price, item_type.name as item_type_name FROM owned_gatcha_item JOIN gatcha_item ON owned_gatcha_item.gatcha_item_id = gatcha_item.id JOIN item_type ON gatcha_item.item_type_id = item_type.id WHERE gatcha_item.quantity > 0`);
  return ownedGatchaItemTableValues;
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

export const fillItemTypeTable = async (db) => {
  try {
    ItemTypeTable.forEach(async (item) => {
      db.runAsync(`INSERT OR IGNORE INTO item_type (id, name) VALUES (?, ?);`, [item.id, item.name]);
    });
    console.log("fillItemTypeTable completed");
  } catch (error) {
    console.error("Error filling item type table:", error);
  }
};

export const fillGatchaItemTable = async (db) => {
  try { 
    GatchaItemTable.forEach(async (item) => {
      db.runAsync(`INSERT OR IGNORE INTO gatcha_item (id, item_type_id, name, description, quantity, price) VALUES (?, ?, ?, ?, ?, ?);`, [item.id, item.item_type_id, item.name, item.description, item.quantity, item.price]);
    });
    console.log("fillGatchaItemTable completed");
  } catch (error) {
    console.error("Error filling gatcha item table:", error);
  }
};

export const initializeDB = async (db) => {
  try {
    await createOwnedPokemonTable(db);
    await createNameTable(db);
    await createItemTypeTable(db);
    await createGatchaItemTable(db);

    const itemTypes = await getItemTypes(db);
    console.log("itemTypes length", itemTypes.length);
    if (itemTypes.length < 3) {
      console.log("fillItemTypeTable triggered");
      fillItemTypeTable(db);
    }

    const allGatchaItems = await getAllGatchaItems(db);
    console.log("allGatchaItems length", allGatchaItems.length);
    if (allGatchaItems.length < 21) {
      console.log("fillGatchaItemTable triggered");
      fillGatchaItemTable(db);
    }

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
