import { fetchPokemonData } from "@/poke-API/pokemonsDataFetch";
import { Pokemon, PokemonTableValues } from "@/types/types";
import { useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native"
import { getCurrentParty } from "@/poke-API/services";
import { useSQLiteContext } from "expo-sqlite";

export default function Combat() {
    const db = useSQLiteContext();
    // Matchup logic
    // Fetch current party
    const [currentParty, setCurrentParty] = useState<PokemonTableValues[]>([])
    // Generate the enemy team
    const [enemyTeam, setEnemyTeam] = useState<Pokemon[]>([]);
    useEffect(() => {
        const generateEnemyTeam = async () => {
            const maxRetries = 10;
            let iteration = 0;
            let enemyPokemons: Pokemon[] = [];

            while (enemyPokemons.length < 6 && iteration < maxRetries) {
                const pokemonGameIndex = Math.floor(Math.random() * 898) + 1;
                const pokemon = await fetchPokemonData(pokemonGameIndex);
                if (!pokemon) {
                    iteration++;
                    continue;
                }
                enemyPokemons.push(pokemon);
                iteration++;
            }
            setEnemyTeam(enemyPokemons)
        }
        generateEnemyTeam().then(() => {
            // Set current party
            getCurrentParty(db).then((pokemons) => {
                setCurrentParty(pokemons)
            })
            // TODO Allow user to place their pokemon against the enemy team
        })
    }, [])
    // TODO Combat logic
    return (
        <>
            <View style={{ backgroundColor: "#ADD8E6" }}>
                <FlatList
                    data={enemyTeam}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={6}
                    scrollEnabled={false}
                    columnWrapperStyle={{
                        flexWrap: "wrap",
                        justifyContent: "flex-start",
                    }}
                    renderItem={({ item }) => (
                        <View style={{ width: "16%", alignItems: "center", marginVertical: 5 }}>
                            <Image source={{ uri: item.front_sprite }} style={{ width: 60, height: 60 }} />
                        </View>
                    )}
                />
            </View>
            <View style={{ backgroundColor: "#90EE90" }}>
                <FlatList
                    data={currentParty}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={6}
                    scrollEnabled={false}
                    columnWrapperStyle={{
                        flexWrap: "wrap",
                        justifyContent: "flex-start",
                    }}
                    renderItem={({ item }) => (
                        <View style={{ width: "16%", alignItems: "center", marginVertical: 5 }}>
                            <Image source={{ uri: item.front_sprite }} style={{ width: 60, height: 60 }} />
                        </View>
                    )}
                />
            </View>
        </>
    )
}
