import { fetchPokemonData } from "@/poke-API/pokemonsDataFetch";
import { Pokemon, PokemonTableValues } from "@/types/types";
import { useCallback, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native"
import { getCurrentParty } from "@/poke-API/services";
import { useSQLiteContext } from "expo-sqlite";
import { useFocusEffect } from "expo-router";

export default function Combat() {
    const db = useSQLiteContext();
    // Matchup logic
    // Fetch current party
    const [currentParty, setCurrentParty] = useState<PokemonTableValues[]>([])
    const [combatSlots, setCombatSlots] = useState<(PokemonTableValues | null)[]>(new Array(6).fill(null));
    // Generate the enemy team
    const [enemyTeam, setEnemyTeam] = useState<Pokemon[]>([]);

    useFocusEffect(useCallback(() => {
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
        })

        return () => {
            setCurrentParty([]);
            setCombatSlots(new Array(6).fill(null))
            setEnemyTeam([])
        }
    }, []))

    const assignToCombatSlot = (pokemon: PokemonTableValues) => {
        setCombatSlots((prev) => {
            const index = prev.findIndex(p => p?.id === pokemon.id);

            if (index !== -1) {
                // Pokémon already in combatSlots, remove and shift left
                const updated = [...prev];
                updated.splice(index, 1);
                updated.push(null);
                return updated;
            } else {
                // Not in combatSlots, add to first empty slot
                const firstEmptyIndex = prev.findIndex(p => p === null);
                if (firstEmptyIndex === -1) return prev;

                const updated = [...prev];
                updated[firstEmptyIndex] = pokemon;
                return updated;
            }
        });
    };
    // https://play.pokemonshowdown.com/sprites/
    // TODO Combat logic
    return (
        <View style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }}>
            {/* Enemy team */}
            <View style={{ flex: 1, width: "100%", backgroundColor: "#ADD8E6", justifyContent: "center", alignItems: "center" }}>
                <FlatList
                    data={enemyTeam}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={6}
                    scrollEnabled={false}
                    columnWrapperStyle={{
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    renderItem={({ item }) => (
                        <View style={{ width: "16.66%", alignItems: "center", marginVertical: 5 }}>
                            <Image source={{ uri: item.front_sprite }} style={{ width: 60, height: 60 }} />
                        </View>
                    )}
                />
            </View>

            {/* Combat slots */}
            <View style={{ flex: 1, width: "100%", backgroundColor: "#C3C3C3", justifyContent: "center", alignItems: "center" }}>
                <FlatList
                    data={combatSlots}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={6}
                    scrollEnabled={false}
                    columnWrapperStyle={{
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    renderItem={({ item }) => (
                        <View style={{ width: "16.66%", alignItems: "center", marginVertical: 5 }}>
                            {item ? (
                                <Image source={{ uri: item.front_sprite }} style={{ width: 60, height: 60 }} />
                            ) : (
                                <View
                                    style={{
                                        width: 60,
                                        height: 60,
                                        backgroundColor: "#C0C0C0",
                                        borderWidth: 2,
                                        borderColor: "darkorange",
                                        borderRadius: 10,
                                    }}
                                />
                            )}
                        </View>
                    )}
                />
            </View>

            {/* Current party */}
            <View style={{ flex: 1, width: "100%", backgroundColor: "#90EE90" }}>
                <FlatList
                    data={currentParty}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={6}
                    scrollEnabled={false}
                    columnWrapperStyle={{
                        flexWrap: "wrap",
                        justifyContent: "flex-start",
                    }}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "center",
                    }}
                    renderItem={({ item }) => {
                        const isInCombat = combatSlots.some(p => p?.id === item.id);
                        return (
                            <View style={{ width: "16%", alignItems: "center", marginVertical: 5 }}>
                                <Pressable onPress={() => assignToCombatSlot(item)} style={{ opacity: isInCombat ? 0.4 : 1 }}>
                                    <Image
                                        source={{ uri: item.front_sprite }}
                                        style={{ width: 60, height: 60 }}
                                    />
                                </Pressable>
                            </View>
                        );
                    }}
                />
            </View>

            {/* Start button */}
            <View style={{ height: 100, width: "100%", backgroundColor: "#FAFAFA", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ width: 100, height: 20, textAlign: "center" }}>Start</Text>
            </View>
        </View>
    )
}
