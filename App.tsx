import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './src/screens/Home';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  return (
    <View style={styles.container}>
      <RootSiblingParent>
        <Home />
      </RootSiblingParent>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F1F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
