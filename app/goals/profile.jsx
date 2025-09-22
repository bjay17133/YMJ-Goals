import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import Firebase auth
import { getAuth, signOut } from "firebase/auth"; // Make sure Firebase is configured

const Profile = () => {
  const [user] = useState({
    name: "John Doe",
    email: "johndoe@email.com",
    avatar: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
  });

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        Alert.alert("👋 Signed Out", "You have been signed out successfully.");
        // Navigate to login or home page if using React Navigation
        // For example: navigation.replace('Login');
      })
      .catch((error) => {
        console.error("Sign out error:", error);
        Alert.alert("Error", "Failed to sign out. Try again.");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF0F5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#6A1B9A",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: "#6A1B9A",
  },
  infoBox: {
    backgroundColor: "#F3E5F5",
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    color: "#6A1B9A",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  signOutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  signOutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Profile;
