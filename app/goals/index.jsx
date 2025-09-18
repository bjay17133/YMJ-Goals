import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const pets = [
  {
    name: 'Cream Brown Dog',
    img: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
    info: 'When you share at least a piece dog you can make your life happier. Dogs are very cute and kind. Always make sure to love them like you love.',
  },
  {
    name: 'Orange Cat',
    img: 'https://cdn-icons-png.flaticon.com/512/616/616430.png',
    info: 'Cats love to cuddle and bring peace at home. They are independent but affectionate companions.',
  },
  
]

const Goals = () => {
  const [index, setIndex] = useState(0)

  const nextPet = () => setIndex((index + 1) % pets.length)
  const prevPet = () => setIndex((index - 1 + pets.length) % pets.length)

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.location}>...</Text>
        <View style={styles.profile}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>👤</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Nearby Pet</Text>

      {/* Pet Card */}
      <View style={styles.card}>
        <Image source={{ uri: pets[index].img }} style={styles.petImage} />
        <Text style={styles.petName}>{pets[index].name}</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{pets[index].info}</Text>
        </View>
      </View>

      {/* Navigation buttons */}
      <View style={styles.navButtons}>
        <TouchableOpacity style={styles.button} onPress={prevPet}>
          <Text style={styles.buttonText}>⬅ </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={nextPet}>
          <Text style={styles.buttonText}> ➡</Text>
        </TouchableOpacity>
      </View>

     {/* Floating Action Button (centered, Add icon) */}
      <TouchableOpacity style={styles.fab} onPress={() => alert('Add new pet')}>
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>


    </SafeAreaView>
  )
}

export default Goals

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff8e7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    color: 'red',
    fontSize: 14,
  },
  profile: {
    width: 35,
    height: 35,
    backgroundColor: 'orange',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#d23dffff',
    borderRadius: 20,
    padding: 100,
    alignItems: 'center',
  },
  petImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoBox: {
    backgroundColor: '#7b4196ff',
    borderRadius: 12,
    padding: 50,
  },
  infoText: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 40,
  },
  button: {
    backgroundColor: '#8503ffff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 60, 
  },
  navIcon: {
    fontSize: 22,
  },
  fab: {
    position: 'absolute',
    bottom: 50, 
    alignSelf: 'center', 
    backgroundColor: '#8503ffff',
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabIcon: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
})
