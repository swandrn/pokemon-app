import { useCallback, useEffect, useState } from "react";
import { FlatList, Image, Pressable, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import typeImages from "@/types/images";
import { useSQLiteContext } from "expo-sqlite";
import { PokemonTableValues, PokemonToFetch } from "@/types/types";
import { useFocusEffect } from "@react-navigation/native";
import { fillNameTable, getAllPokemons, getOwnedPokemons, initializeDB } from "@/poke-API/database";
import { addPokemonToParty, removePokemonFromParty } from "@/poke-API/services";

import React from "react";
import Pokedex from "./pokedex";
import { createNameTable, createOwnedPokemonTable } from "@/poke-API/models";

export default function PC() {
  const db = useSQLiteContext();
  const [ownedPokemons, setOwnedPokemons] = useState<PokemonTableValues[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonTableValues[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isPokedexOpen, setIsPokedexOpen] = useState(false);
  const [pokemonsInParty, setPokemonsInParty] = useState<PokemonTableValues[]>([]);

  // Create table on mount
  useEffect(() => {
    initializeDB(db);
  }, []);

  useEffect(() => {
    const inParty = ownedPokemons.filter(p => p.in_party === 1);
    setPokemonsInParty(inParty);
  }, [ownedPokemons]);

  const filterPokemons = () => {
    if (selectedTypes.length === 0) {
      setFilteredPokemons(ownedPokemons);
      return;
    }
    const filtered = ownedPokemons.filter((pokemon) =>
      selectedTypes.includes(pokemon.primary_type) ||
      (pokemon.secondary_type && selectedTypes.includes(pokemon.secondary_type))
    );
    setFilteredPokemons(filtered);
  };

  useEffect(() => {
    filterPokemons();
  }, [selectedTypes, ownedPokemons]);

  useFocusEffect(
    useCallback(() => {
      getOwnedPokemons(db).then((values) => {
        setOwnedPokemons(values);
        setFilteredPokemons(values);
      });
      // Optionally, return a cleanup function if needed.
      return () => {
        // cleanup if necessary
      };
    }, [])
  );

  const togglePokemonInParty = (pokemon: PokemonTableValues) => {
    const toggleFn = pokemon.in_party ? removePokemonFromParty : addPokemonToParty;
    toggleFn(db, pokemon.id).then((success: boolean) => {
      if (!success) return;

      setOwnedPokemons(prev =>
        prev.map(p =>
          p.id === pokemon.id
            ? { ...p, in_party: p.in_party ? 0 : 1 }
            : p
        )
      );
    });
  }

  return (
    <View
      style={{
        flex: 1,
        position: "relative",
      }}>
      {/* --------------------{PC}-------------------- */}
      {!isPokedexOpen && (
        <>
          <View style={{}}>
            <FlatList
              style={{ width: "100%" }}
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
            <FlatList
              style={{}}
              data={pokemonsInParty}
              keyExtractor={(item) => item.id.toString()}
              numColumns={6}
              scrollEnabled={false}
              columnWrapperStyle={{
                flexWrap: "wrap",
                justifyContent: "flex-start",
              }}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => togglePokemonInParty(item)} key={item.id}>
                  <View key={item.id} style={{ width: "16%", alignItems: "center", marginVertical: 5, backgroundColor: "#4F9EFF", borderWidth: 2, marginHorizontal: 1, borderColor: "darkorange", borderRadius: 10, boxShadow: "1px 3px 0px 0px rgba(0, 0, 0, 0.3)" }}>
                    <Image source={{ uri: item.front_sprite }} style={{ width: 60, height: 60 }} />
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
          <ScrollView style={{ flex: 1, flexDirection: "column", padding: 10, minHeight: "100%" }}>
            <View style={{}}>
              <FlatList
                style={{}}
                data={filteredPokemons}
                keyExtractor={(item) => item.id.toString()}
                numColumns={5}
                scrollEnabled={false}
                columnWrapperStyle={{
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                }}
                renderItem={({ item }) => (
                  <TouchableWithoutFeedback onPress={() => togglePokemonInParty(item)} key={item.id}>
                    <View key={item.id} style={{ width: "19%", alignItems: "center", marginVertical: 5, backgroundColor: "#ffb04f", borderWidth: 2, marginHorizontal: 1, borderColor: "darkorange", borderRadius: 10, boxShadow: "1px 3px 0px 0px rgba(0, 0, 0, 0.3)" }}>
                      <Image source={{ uri: item.front_sprite }} style={{ width: 60, height: 60 }} />
                    </View>
                  </TouchableWithoutFeedback>
                )}
              />
            </View>
          </ScrollView>
        </>

      )
      }

      {/* --------------------{POKEDEX}-------------------- */}

      {isPokedexOpen && <Pokedex />}

      {/* --------------------{POKEDEX BUTTON}-------------------- */}
      <View
        style={{
          position: "absolute",
          bottom: 12,
          left: 12,
          zIndex: 1000,
        }}>
        <Pressable onPress={() => setIsPokedexOpen(!isPokedexOpen)}>
          <Image
            source={require("@/assets/images/Pokedex.png")}
            style={{
              width: 80,
              height: 80,
              opacity: 0.8,
            }}
          />
        </Pressable>
      </View>
    </View >
  );
}
