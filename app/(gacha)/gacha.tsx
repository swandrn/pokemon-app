import { Pokemon, PokemonTableValues, PokemonToFetch } from "@/types/types";
import { useEffect, useState } from "react";
import { Button, Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchPokemonData } from "../../poke-API/pokemonsDataFetch";
import { useSQLiteContext } from "expo-sqlite";
import { formatFromAPI } from "../../poke-API/formatApiResponse";
import { createOwnedPokemonTable } from "@/poke-API/models";
import { getAllPokemons, initializeDB } from "@/poke-API/database";
import { fillNameTable } from "@/poke-API/database";

export default function Gacha() {
  const db = useSQLiteContext();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [tapCount, setTapCount] = useState(0);

  // Create table on mount
  useEffect(() => {
    initializeDB(db);
  }, []);

  const fetchPokemon = async (pokemonGameIndex: number) => {
    const isShiny = false;
    const json = await fetchPokemonData(pokemonGameIndex, isShiny);
    const pokemonTableValues: PokemonTableValues = formatFromAPI(json);
    try {
      const existingPokemon = await db.getFirstAsync(`SELECT count FROM pokemon WHERE game_index = ? AND is_shiny = ?`, [pokemonTableValues.game_index, isShiny]);

      if (existingPokemon) {
        await db.runAsync(`UPDATE pokemon SET count = count + 1 WHERE game_index = ? AND is_shiny = ?`, [pokemonTableValues.game_index, isShiny]);
        console.log(`Updated count for Pokémon: ${pokemonTableValues.name}`);
      } else {
        await db.runAsync(
          `INSERT INTO pokemon 
                      (game_index, name, primary_type, secondary_type, front_sprite, back_sprite, hp_stat, attack_stat, defense_stat, special_attack_stat, special_defense_stat, speed_stat, is_shiny)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          [pokemonTableValues.game_index, pokemonTableValues.name, pokemonTableValues.primary_type, pokemonTableValues.secondary_type, pokemonTableValues.front_sprite, pokemonTableValues.back_sprite, pokemonTableValues.hp_stat, pokemonTableValues.attack_stat, pokemonTableValues.defense_stat, pokemonTableValues.special_attack_stat, pokemonTableValues.special_defense_stat, pokemonTableValues.speed_stat, isShiny]
        );
        console.log(`Inserted Pokémon: ${pokemonTableValues.name}`);
      }

      setPokemon(json);
    } catch (error) {
      console.error("Error inserting or updating Pokémon:", error);
    }
  };

  const handlePress = () => {
    setTapCount((prev) => prev + 1);

    setTimeout(() => {
      setTapCount(0);
    }, 3000);

    if (tapCount + 1 === 3) {
      setTapCount(0);
      const pokemonGameIndex = Math.floor(Math.random() * 898) + 1;
      fetchPokemon(pokemonGameIndex);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column", padding: 10, backgroundColor: "white" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={require("../../assets/images/PokeEgg.png")} style={{ width: 200, height: 200, objectFit: "contain" }} />
      </View>
    </SafeAreaView>
  );
}
