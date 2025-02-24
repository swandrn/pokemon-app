import { Pokemon } from "@/types/types";
import { useState } from "react";
import { Button, Image, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchPokemonData } from "../../poke-API/pokemonsDataFetch";
import typeImages from "@/types/images";

export default function PC() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemonGameIndex, setPokemonGameIndex] = useState<string>("");
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
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>{pokemon?.name}</Text>
          <Image source={{ uri: pokemon?.sprites.front }} style={{ width: 140, height: 140 }} />
        <View style={{ flexDirection: "row", gap: 10 }}>
          {pokemon?.types.map((type) => {
            return <Image key={type.type.name} source={typeImages[type.type.name] || typeImages["default"]} style={{ width: 40, height: 40 }} />;
          })}
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
      )}
    </ScrollView>
  );
}
