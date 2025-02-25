import { Pokemon } from "@/types/types";
import { useCallback, useEffect, useState } from "react";
import { Button, FlatList, Image, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchPokemonData } from "../../poke-API/pokemonsDataFetch";
import typeImages from "@/types/images";
import { useSQLiteContext } from "expo-sqlite";
import { PokemonTableValues } from "@/types/types";
import { useFocusEffect } from "@react-navigation/native";

export default function PC() {
  const db = useSQLiteContext();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemonGameIndex, setPokemonGameIndex] = useState<string>("");
  const [ownedPokemons, setOwnedPokemons] = useState<PokemonTableValues[]>([]);

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

  useFocusEffect(
    useCallback(() => {
      const getOwnedPokemons = async () => {
        const pokemonTableValues: PokemonTableValues[] = await db.getAllAsync(
          `SELECT game_index, name, primary_type, secondary_type, front_sprite, back_sprite, 
                  hp_stat, attack_stat, defense_stat, special_attack_stat, special_defense_stat, speed_stat, isShiny 
           FROM pokemon`
        );
        setOwnedPokemons(pokemonTableValues);
      };

      getOwnedPokemons();

      // Optionally, return a cleanup function if needed.
      return () => {
        // cleanup if necessary
      };
    }, [])
  );

  const [fetchError, setFetchError] = useState<string>("");

  const fetchPokemon = async () => {
    setFetchError("");
    if (pokemonGameIndex === "") {
      return;
    }
    const pokemon = await fetchPokemonData(pokemonGameIndex);
    setPokemon(pokemon);
  };

  return (
    <ScrollView style={{ flex: 1, flexDirection: "column", padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>PC</Text>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>Pokemons</Text>
        <TextInput
          placeholder="Pokemon Game index to fetch"
          value={pokemonGameIndex}
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, ""); // Allow only numbers
            if (parseInt(numericText, 10) <= 898 || numericText === "") {
              // Ensure the number is not greater than 898
              setPokemonGameIndex(numericText);
              setFetchError("");
            } else {
              setFetchError("Invalid Pokemon Game index (max is 898)");
            }
          }}
          keyboardType="numeric" // Show numeric keyboard
        />
        <Button title="Fetch Pokemon" color={pokemonGameIndex === "" ? "gray" : "blue"} onPress={() => fetchPokemon()} />

        <Text style={{ fontSize: 12, fontWeight: "bold", color: "red" }}>{fetchError ?? ""}</Text>
      </View>
      {pokemon && (
        <View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>{pokemon?.name}</Text>
            <Image source={{ uri: pokemon?.front_sprite }} style={{ width: 140, height: 140 }} />
            <View style={{ flexDirection: "row", gap: 10 }}>
              {<>
                <Image key={pokemon.types.primary_type} source={typeImages[pokemon.types.primary_type] || typeImages["default"]} style={{ width: 40, height: 40 }} />
                {pokemon.types.secondary_type && <Image key={pokemon.types.secondary_type} source={typeImages[pokemon.types.secondary_type] || typeImages["default"]} style={{ width: 40, height: 40 }} />
                }
              </>}
            </View>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>Stats</Text>

            {pokemon?.stats.map((stat) => (
              <Text key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </Text>
            ))}
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>Moves</Text>
            {pokemon?.moves.map((move) => (
              <Text key={move.name}>{move.name}</Text>
            ))}
          </View>
        </View>
      )}
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>Caught Pokemons</Text>
        <FlatList
          data={ownedPokemons}
          keyExtractor={(item, index) => index.toString()}
          numColumns={5}
          scrollEnabled={false}
          columnWrapperStyle={{
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
          renderItem={({ item }) => (
            <View style={{ width: "20%", alignItems: "center", marginVertical: 5 }}>
              <Image source={{ uri: item.front_sprite }} style={{ width: 60, height: 60 }} />
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}
