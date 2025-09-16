import { Link } from 'expo-router'
import { View, Text, StyleSheet } from 'react-native'

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        CRUELTY PET
      </Text>
      <Link style={styles.link} href="/goals">
        SIGNIN
      </Link>
      <Link style={styles.link} href="/goals/create">
        SIGNUP
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    marginVertical: 40,
    fontSize: 28,
  },
  link: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#52d3f3ff',
    color: 'white',
    borderRadius: 8,
  },
})

export default Home