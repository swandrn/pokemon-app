export async function addPokemonToParty(db, pokemonId) {
    try {
        const partyCountResult = await db.getFirstAsync(
            `SELECT COUNT(*) as count FROM pokemon WHERE inParty = 1;`
        );

        const partyCount = partyCountResult?.count ?? 0;

        if (partyCount >= 6) {
            return false;
        }

        await db.runAsync(
            `UPDATE pokemon SET inParty = 1 WHERE id = ?;`,
            [pokemonId]
        );

        return true;
    } catch (error) {
        console.error("Error adding Pokémon to party:", error);
        return false;
    }
}

export async function removePokemonFromParty(db, pokemonId) {
    try {
        const partyCountResult = await db.getFirstAsync(
            `SELECT COUNT(*) as count FROM pokemon WHERE inParty = 1;`
        );

        const partyCount = partyCountResult?.count ?? 0;

        if (partyCount === 0) {
            return false;
        }

        const pokemonInParty = await db.getFirstAsync(
            `SELECT id FROM pokemon WHERE id = ? AND inParty = 1;`,
            [pokemonId]
        );

        if (!pokemonInParty) {
            return false;
        }

        await db.runAsync(
            `UPDATE pokemon SET inParty = 0 WHERE id = ?;`,
            [pokemonId]
        );

        return true;
    } catch (error) {
        console.error("Error removing Pokémon from party:", error);
        return false;
    }
}

export async function getCurrentParty(db){
    try {
        const partyPokemons = await db.getAllAsync(
            `SELECT * FROM pokemon WHERE in_party = 1;`
        );
        return partyPokemons;
    } catch (error) {
        console.error("Error fetching current party:", error);
        return [];
    }
}