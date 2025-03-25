import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { AllPokemons, Pokemon } from "../../types/types";
import { fetchAllPokemons, fetchPokemonData, fetchPokemonDescription } from "@/poke-API/pokemonsDataFetch";
import typeImages from "@/types/images";

export default function Pokedex() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [fetchedPokemons, setFetchedPokemons] = useState<AllPokemons | null>(null);
  const [pokemonDescription, setPokemonDescription] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    fetchAllPokemons(0).then((data) => {
      setFetchedPokemons(data);
    });
    fetchPokemonData(1, false).then((data) => {
      setSelectedPokemon(data as Pokemon);
    });
  }, []);

  useEffect(() => {
    fetchPokemonDescription(selectedPokemon?.game_index).then((data) => {
      setPokemonDescription(data);
    });
    console.log(pokemonDescription);
  }, [selectedPokemon]);

  const handlePageChange = (page: number) => {
    fetchAllPokemons(page).then((data) => {
      setFetchedPokemons({...fetchedPokemons, ...(data as AllPokemons)});
    });
  };

  const filterByType = (pokemon: Pokemon) => {
  
  };


  return (
    <View style={{flex: 1, flexDirection: "column", padding: 5, minHeight: "100%"}}>
      <FlatList
        style={{ width: "100%", flex: 1 }}
        data={Object.values(typeImages)}
        keyExtractor={(item, index) => index.toString()}
        numColumns={9}
        scrollEnabled={false}
        columnWrapperStyle={{
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              if (selectedTypes.includes(Object.keys(typeImages)[index])) {
                setSelectedTypes(selectedTypes.filter((type) => type !== Object.keys(typeImages)[index]));
              } else {
                setSelectedTypes([...selectedTypes, Object.keys(typeImages)[index]]);
              }
            }}
            style={{ width: "9%", alignItems: "center", marginVertical: 5, marginHorizontal: 3 }}>
            <Image source={item} style={{ width: 35, height: 35, opacity: selectedTypes.includes(Object.keys(typeImages)[index]) ? 1 : 0.5, borderWidth: selectedTypes.includes(Object.keys(typeImages)[index]) ? 2 : 0, borderColor: "darkorange", borderRadius: 15 }} />
          </Pressable>
        )}
      />
      <View
        style={{
          flex: 6,
          position: "relative",
          flexDirection: "row",
        }}>
        <View
          style={{
            flex: 1.2,
            height: "100%",
          }}>
          <View
            style={{
              borderWidth: 3,
              borderColor: "black",
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: "red",
              borderRadius: 10,
              width: "90%",
              alignSelf: "center",
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                textAlign: "center",
                padding: 5,
                color: "black",
                backgroundColor: "white",
              }}>
              {selectedPokemon?.name}
            </Text>
          </View>
          <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", width: 200, height: 200, alignSelf: "center" }}>
            <Image source={{ uri: selectedPokemon?.front_sprite }} style={{ width: "100%", height: "100%", alignSelf: "center" }} />
            <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center", marginTop: 0, position: "absolute", top: 30, left: 15 }}>{"#" + selectedPokemon?.game_index}</Text>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", position: "absolute", bottom: 10, left: 15 }}>
              <Image source={typeImages[selectedPokemon?.types.primary_type as keyof typeof typeImages]} style={{ width: 30, height: 30, alignSelf: "center" }} />
              <Image source={typeImages[selectedPokemon?.types.secondary_type as keyof typeof typeImages]} style={{ width: 30, height: 30, alignSelf: "center" }} />
            </View>
          </View>

          <Text style={{ fontSize: 14, marginTop: 5, paddingHorizontal: 8 }}>{pokemonDescription?.replace(/[\n\r]+/g, " ")}</Text>
        </View>
        <FlatList
          style={{
            flex: 1,
            borderWidth: 3,
            borderColor: "black",
            marginRight: 5,
            marginTop: 10,
            marginBottom: 20,
            borderRadius: 10,
          }}
          contentContainerStyle={{
            padding: 10,
          }}
          data={fetchedPokemons?.results}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                if (item.name !== selectedPokemon?.name) {
                  fetchPokemonData(0, false, item.url).then((data) => {
                    setSelectedPokemon(data as Pokemon);
                  });
                }
              }}
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                backgroundColor: "white",
                marginBottom: 5,
                borderRadius: 5,
                borderWidth: item.name === selectedPokemon?.name ? 2 : 0,
                borderColor: item.name === selectedPokemon?.name ? "darkorange" : "transparent",
                shadowColor: item.name === selectedPokemon?.name ? "transparent" : "black",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  textTransform: "capitalize",
                }}>
                {item.name}
              </Text>
            </Pressable>
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    </View>
  );
}
