import { Pokemon } from "@/types/types";
import { useState } from "react";
import { Button, Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {fetchPokemonData} from "../../poke-API/pokemonsDataFetch"


export default function PC() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemonGameIndex, setPokemonGameIndex] = useState<string>("");

  const fetchPokemon = async () => {
    const pokemon = await fetchPokemonData(pokemonGameIndex);
    setPokemon(pokemon);

  }

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column", padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>PC</Text>
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
