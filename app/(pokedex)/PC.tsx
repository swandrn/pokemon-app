import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

function PC() {
    return (
        <SafeAreaView style={{ height: 100, flexDirection: 'row' }}>
            <View style={{ backgroundColor: 'yellow', flex: 0.2 }} />
            <View style={{ backgroundColor: 'brown', flex: 0.4 }} />
        </SafeAreaView>
    )
}

export { PC }