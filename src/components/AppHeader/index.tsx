import { Text, View, StyleSheet } from 'react-native';

export const AppHeader: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 110,
    backgroundColor: '#5636D3',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 0.5,
  },
});
