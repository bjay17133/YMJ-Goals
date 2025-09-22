import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@my_pets';

export default function PetCollection() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const loadPets = async () => {
      try {
        const storedPets = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedPets) setPets(JSON.parse(storedPets));
      } catch (error) {
        console.error('Error loading pets:', error);
      }
    };
    loadPets();
  }, []);

  const handleDelete = async (id) => {
    const newPets = pets.filter(p => p.id !== id);
    setPets(newPets);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newPets));
  };

  if (pets.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={styles.emptyText}>🐾 No pets saved yet!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.petImage} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.type}>{item.type}</Text>
              <Text style={styles.info}>{item.info}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5FF',
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  petImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#D3B8FF',
  },
  textContainer: {
    flex: 1,
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#6A1B9A', marginBottom: 4 },
  type: { fontSize: 14, color: '#9C27B0', marginBottom: 6 },
  info: { fontSize: 14, color: '#4A148C', flexWrap: 'wrap' },
  deleteButton: {
    backgroundColor: '#FF5252',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  emptyText: { fontSize: 20, color: '#7B4196', textAlign: 'center' },
});
