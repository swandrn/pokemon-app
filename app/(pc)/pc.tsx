import { Pokemon } from "@/types/types"
import { useState } from "react"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function PC() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([])
    return (
        <SafeAreaView style={{ height: 100, flexDirection: 'row' }}>
           
        </SafeAreaView>
    )
}
