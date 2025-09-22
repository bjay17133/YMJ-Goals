import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Image,
  TextInput, TouchableOpacity, FlatList, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@my_pets';

export default function Home() {
  const router = useRouter();
  const [pets, setPets] = useState([]);
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [editId, setEditId] = useState(null);

  // Load pets from AsyncStorage on mount
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

  // Save pets to AsyncStorage whenever pets change
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pets));
  }, [pets]);

  // Add or update a pet
  const handleAddOrUpdate = () => {
    if (!petName || !petType) {
      Alert.alert('Missing Fields', 'Please enter both pet name and type.');
      return;
    }

    if (editId) {
      setPets(pets.map(p =>
        p.id === editId
          ? { ...p, name: petName, type: petType, info: `${petName} is a ${petType}.` }
          : p
      ));
      setEditId(null);
    } else {
      const newPet = {
        id: Date.now().toString(),
        name: petName,
        type: petType,
        img: petType.toLowerCase() === 'pig'
          ? 'https://cdn-icons-png.flaticon.com/512/616/6164087.png'
          : 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
        info: `${petName} is a ${petType}.`,
      };
      setPets([...pets, newPet]);
    }

    setPetName('');
    setPetType('');
  };

  // Edit a pet
  const handleEdit = pet => {
    setPetName(pet.name);
    setPetType(pet.type);
    setEditId(pet.id);
  };

  // Save pet to AsyncStorage collection & navigate
  const handleSavePet = async (pet) => {
    try {
      const storedPets = await AsyncStorage.getItem(STORAGE_KEY);
      const savedPets = storedPets ? JSON.parse(storedPets) : [];
      const exists = savedPets.find(p => p.id === pet.id);

      if (!exists) {
        savedPets.push(pet);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedPets));
        Alert.alert('Success', `${pet.name} saved to your collection!`);
      } else {
        Alert.alert('Info', `${pet.name} is already in your collection.`);
      }

      router.push('/goals/petcollection');
    } catch (error) {
      console.error('Error saving pet:', error);
      Alert.alert('Error', 'Failed to save pet.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🐾 ADD YOUR NEW BUDDY</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Pet Name"
          value={petName}
          onChangeText={setPetName}
        />
        <TextInput
          style={styles.input}
          placeholder="Pet Type"
          value={petType}
          onChangeText={setPetType}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleAddOrUpdate}>
          <Text style={styles.saveButtonText}>{editId ? 'Update Pet' : 'Add Pet'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={pets}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.petImage} />
            <Text style={styles.petName}>{item.name}</Text>
            <Text style={styles.petType}>{item.type}</Text>
            <Text style={styles.infoText}>{item.info}</Text>

            <View style={styles.cardButtons}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveCardButton} onPress={() => handleSavePet(item)}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFF8E7' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginVertical: 10, color: '#7B4196' },
  form: { backgroundColor: '#EFD9FF', padding: 16, borderRadius: 12, marginBottom: 20 },
  input: { backgroundColor: 'white', borderWidth: 1, borderColor: '#7B4196', padding: 12, borderRadius: 8, marginBottom: 12, fontSize: 16 },
  saveButton: { backgroundColor: '#D23DFF', padding: 12, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  saveButtonText: { color: 'white', fontWeight: 'bold' },
  card: { backgroundColor: '#7B4196FF', borderRadius: 16, padding: 20, marginBottom: 15, alignItems: 'center' },
  petImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  petName: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  petType: { fontSize: 16, color: '#EFD9FF', marginBottom: 6 },
  infoText: { color: 'white', fontSize: 14, textAlign: 'center', marginBottom: 12 },
  cardButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '60%' },
  editButton: { backgroundColor: '#8503FF', padding: 8, borderRadius: 8, flex: 1, marginRight: 5, alignItems: 'center' },
  saveCardButton: { backgroundColor: '#00C851', padding: 8, borderRadius: 8, flex: 1, marginLeft: 5, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
