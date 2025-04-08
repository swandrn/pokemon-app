export const createOwnedPokemonTable = async (db) => {
    try {
        // await db.execAsync(`DROP TABLE IF EXISTS pokemon;`);
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
                        speed_stat INTEGER NOT NULL,
                        is_shiny INTEGER NOT NULL,
                        in_party INTEGER DEFAULT 0,
                        count INTEGER DEFAULT 1
                    );
                `);
        console.log("Table pokemon created successfully");
    } catch (error) {
        console.error("Error creating table:", error);
    }
};

export const createNameTable = async (db) => {
    try {
       // await db.execAsync(`DROP TABLE IF EXISTS name;`);
      
        await db.execAsync(`
                    CREATE TABLE IF NOT EXISTS name (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL,
                        url TEXT NOT NULL
                        );
                `);
        console.log("Table name created successfully");
    } catch (error) {
        console.error("Error creating table:", error);
    }
};