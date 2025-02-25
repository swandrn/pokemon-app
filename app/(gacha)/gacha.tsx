import { Pokemon, PokemonTableValues } from "@/types/types";
import { useEffect, useState } from "react";
import { Button, Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchPokemonData } from "../../poke-API/pokemonsDataFetch"
import { useSQLiteContext } from "expo-sqlite";
import { formatFromAPI } from "../../poke-API/formatApiResponse";

export default function Gacha() {
    const db = useSQLiteContext();
    const [pokemon, setPokemon] = useState<Pokemon>();
    const [tapCount, setTapCount] = useState(0);

    // Create table on mount
    useEffect(() => {
        const createTable = async () => {
            try {
                await db.execAsync(`DROP TABLE IF EXISTS pokemon;`);
                console.log("Pokémon table deleted successfully");
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
                        isShiny INTEGER NOT NULL,
                        count INTEGER DEFAULT 1
                    );
                `);
                console.log("Table created successfully");
            } catch (error) {
                console.error("Error creating table:", error);
            }
        };

        createTable();
    }, []);

    const fetchPokemon = async (pokemonGameIndex: number) => {
        const isShiny = false;
        const json = await fetchPokemonData(pokemonGameIndex, isShiny);
        const pokemonTableValues: PokemonTableValues = formatFromAPI(json);
        try {
            const existingPokemon = await db.getFirstAsync(
                `SELECT count FROM pokemon WHERE game_index = ? AND isShiny = ?`,
                [pokemonTableValues.game_index, isShiny]
            );

            if (existingPokemon) {
                await db.runAsync(
                    `UPDATE pokemon SET count = count + 1 WHERE game_index = ? AND isShiny = ?`,
                    [pokemonTableValues.game_index, isShiny]
                );
                console.log(`Updated count for Pokémon: ${pokemonTableValues.name}`);
            } else {
                await db.runAsync(
                    `INSERT INTO pokemon 
                      (game_index, name, primary_type, secondary_type, front_sprite, back_sprite, hp_stat, attack_stat, defense_stat, special_attack_stat, special_defense_stat, speed_stat, isShiny)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                    [
                        pokemonTableValues.game_index,
                        pokemonTableValues.name,
                        pokemonTableValues.primary_type,
                        pokemonTableValues.secondary_type,
                        pokemonTableValues.front_sprite,
                        pokemonTableValues.back_sprite,
                        pokemonTableValues.hp_stat,
                        pokemonTableValues.attack_stat,
                        pokemonTableValues.defense_stat,
                        pokemonTableValues.special_attack_stat,
                        pokemonTableValues.special_defense_stat,
                        pokemonTableValues.speed_stat,
                        isShiny,
                    ]
                );
                console.log(`Inserted Pokémon: ${pokemonTableValues.name}`);
            }

            setPokemon(json);
        } catch (error) {
            console.error("Error inserting or updating Pokémon:", error);
        }
    }

    const handlePress = () => {
        setTapCount((prev) => prev + 1);

        setTimeout(() => {
            setTapCount(0);
        }, 3000);

        if (tapCount + 1 === 3) {
            setTapCount(0);
            const pokemonGameIndex = Math.floor(Math.random() * 898) + 1;
            fetchPokemon(pokemonGameIndex)
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, flexDirection: "column", padding: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>Gacha</Text>
            <View>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>Pokemons</Text>
                <Button title="Fetch Pokemon" onPress={() => handlePress()
                } />
            </View>
            <View>
                <Image source={{ uri: pokemon?.front_sprite }} style={{ width: 100, height: 100 }} />
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>{pokemon?.name}</Text>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>Stats</Text>
                {pokemon?.stats.map((stat) => (
                    <Text key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</Text>
                ))}
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>Moves</Text>
                {pokemon?.moves.map((move) => (
                    <Text key={move.name}>{move.name}</Text>
                ))}
            </View>
        </SafeAreaView>
    );
}
