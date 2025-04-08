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

export const createItemTypeTable = async (db) => {
  try {
    await db.execAsync(`
            CREATE TABLE IF NOT EXISTS item_type (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL              
                );
        `);
    console.log("Table ItemTypeTable created successfully");
  } catch (error) {
    console.error("Error creating table ItemTypeTable:", error);
  }
};

export const createGatchaItemTable = async (db) => {
  try {
    await db.execAsync(`
            CREATE TABLE IF NOT EXISTS gatcha_item (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                item_type_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                quantity INTEGER NOT NULL,
                price INTEGER NOT NULL,
                FOREIGN KEY (item_type_id) REFERENCES item_type(id)
                );
        `);
    console.log("Table GatchaItemTable created successfully");
  } catch (error) {
    console.error("Error creating table GatchaItemTable:", error);
  }
};

export const ItemTypeTable = [
    {
        "id": 1,
        "name": "stone"
    },
    {
        "id": 2,
        "name": "gem"
    },
    {
        "id": 3,
        "name": "dust"
    }
];

export const GatchaItemTable = [
    {
        "id": 1,
        "item_type_id": ItemType.dust,
        "name": "shiny dust",
        "description": "This dust give your egg a better chance to hatch into a shiny pokemon",
        "quantity": 0,
        "price": 1000
    },
    {
        "id": 2,
        "item_type_id": ItemType.egg,
        "name": "egg",
        "description": "Bring this egg to the gatcha machine to hatch it !",
        "quantity": 0,
        "price": 500
    },
    {
        "id": 3,
        "item_type_id": ItemType.stone,
        "name": "fire stone",
        "description": "This stone garantee your egg will hatch into a fire type pokemon",
        "quantity": 0,
        "price": 100
    },
    {
        "id": 4,
        "item_type_id": ItemType.stone,
        "name": "water stone",
        "description": "This stone garantee your egg will hatch into a water type pokemon",
        "quantity": 0,
        "price": 100
    },
    {
        "id": 5,
        "item_type_id": ItemType.stone,
        "name": "plant stone",
        "description": "This stone garantee your egg will hatch into a plant type pokemon",
        "quantity": 0,
        "price": 100
    },
    {
        "id": 6,
        "item_type_id": ItemType.stone,
        "name": "thunder stone",
        "description": "This stone garantee your egg will hatch into a thunder type pokemon",
        "quantity": 0,
        "price": 100
    },
    {
        "id": 7,
        "item_type_id": ItemType.stone,
        "name": "normal stone",
        "description": "This stone garantee your egg will hatch into a normal type pokemon",
        "quantity": 0,
        "price": 100
    },
    {
        "id": 8,
        "item_type_id": ItemType.stone,
        "name": "fighting stone",
        "description": "This stone garantee your egg will hatch into a fighting type pokemon",
        "quantity": 0,
        "price": 100
    },
    {
        "id": 9,
        "item_type_id": ItemType.stone,
        "name": "poison stone",
        "description": "This stone garantee your egg will hatch into a poison type pokemon",
        "quantity": 0,
        "price": 100
    },
    {
        "id": 10,
        "item_type_id": ItemType.stone,
        "name": "ground stone",
        "description": "This stone garantee your egg will hatch into a ground type pokemon",
        "quantity": 0,
        "price": 100
    },
    {
        "id": 11,
        "item_type_id": ItemType.stone,
        "name": "flying stone",
        "description": "This stone garantee your egg will hatch into a flying type pokemon",
        "quantity": 0,
        "price": 100
    },
    {
        "id": 12,
        "item_type_id": ItemType.stone,
        "name": "psychic stone",
        "description": "This stone garantee your egg will hatch into a psychic type pokemon",
        "quantity": 0,
        "price": 100
    },
    {
        "id": 13,
        "item_type_id": ItemType.stone,
        "name": "bug stone",
        "description": "This stone garantee your egg will hatch into a bug type pokemon",
        "quantity": 0,
        "price": 100
    },
    {
        "id": 14,
        "item_type_id": ItemType.stone,
        "name": "rock stone",
        "description": "This stone garantee your egg will hatch into a rock type pokemon",
        "quantity": 0,
        "price": 100
    },
    {
        "id": 15,
        "item_type_id": ItemType.stone,
        "name": "ghost stone",
        "description": "This stone garantee your egg will hatch into a ghost type pokemon",
        "quantity": 0,
        "price": 100
    },
    {
        "id": 16,
        "item_type_id": ItemType.stone,
        "name": "dragon stone",
        "description": "This stone garantee your egg will hatch into a dragon type pokemon",
        "quantity": 0,
        "price": 100
    },  
    {
        "id": 17,
        "item_type_id": ItemType.stone,
        "name": "dark stone",
        "description": "This stone garantee your egg will hatch into a dark type pokemon",
        "quantity": 0,
        "price": 100
    },  
    {
        "id": 18,
        "item_type_id": ItemType.stone,
        "name": "steel stone",
        "description": "This stone garantee your egg will hatch into a steel type pokemon",
        "quantity": 0,
        "price": 100
    },      
    {
        "id": 19,
        "item_type_id": ItemType.stone,
        "name": "fairy stone",
        "description": "This stone garantee your egg will hatch into a fairy type pokemon",
        "quantity": 0,
        "price": 100
    },  
    {
        "id": 20,
        "item_type_id": ItemType.stone,
        "name": "ice stone",
        "description": "This stone garantee your egg will hatch into a ice type pokemon",
        "quantity": 0,
        "price": 100
    },
    {
        "id": 21,
        "item_type_id": ItemType.dust,
        "name": "shiny dust",
        "description": "This dust give your egg a better chance to hatch into a shiny pokemon",
        "quantity": 0,
        "price": 1000
    },

]