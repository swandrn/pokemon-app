import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

function Pokemons() {
    return (
        <SafeAreaView style={{ height: 100, flexDirection: 'row' }}>
            <View style={{ backgroundColor: 'green', flex: 0.2 }} />
            <View style={{ backgroundColor: 'red', flex: 0.4 }} />
        </SafeAreaView>
    )
}

export { Pokemons }