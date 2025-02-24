import { Pokemon } from "@/types/types";
import { useEffect, useState } from "react";
import { Button, Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchPokemonData } from "../../poke-API/pokemonsDataFetch"
import { useSQLiteContext } from "expo-sqlite";
import { formatFromAPI } from "../../poke-API/formatApiResponse";

export interface PokemonTableValues {
    game_index: number;
    name: string;
    primary_type: string;
    secondary_type: string;
    front_sprite: string;
    back_sprite: string;
    hp_stat: number;
    attack_stat: number;
    defense_stat: number;
    special_attack_stat: number;
    special_defense_stat: number;
    speed_stat: number;
}

export default function Gacha() {
    const db = useSQLiteContext();
    const [pokemon, setPokemon] = useState<Pokemon>();
    const [pokemonGameIndex, setPokemonGameIndex] = useState<string>("");

    // Create table on mount
    useEffect(() => {
        const createTable = async () => {
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

        createTable();
    }, []);

    const fetchPokemon = async () => {
        const json = await fetchPokemonData(pokemonGameIndex);
        const pokemonTableValues: PokemonTableValues = formatFromAPI(json);
        try {
            await db.runAsync(
                `INSERT INTO pokemon 
                  (game_index, name, primary_type, secondary_type, front_sprite, back_sprite, hp_stat, attack_stat, defense_stat, special_attack_stat, special_defense_stat, speed_stat)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
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
                ]
            );
            console.log(`Inserted Pokémon: ${pokemonTableValues.name}`);
            setPokemon(json);
        } catch (error) {
            console.error("Error inserting Pokémon:", error);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, flexDirection: "column", padding: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>Gacha</Text>
            <View>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>Pokemons</Text>
                <TextInput placeholder="Pokemon Game index to fetch" value={pokemonGameIndex} onChangeText={(text) => setPokemonGameIndex(text)} />
                <Button title="Fetch Pokemon" onPress={() => fetchPokemon()} />
            </View>
            <View>
                <Image source={{ uri: pokemon?.sprites.front }} style={{ width: 100, height: 100 }} />
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
