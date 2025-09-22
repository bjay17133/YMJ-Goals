import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const { width } = Dimensions.get("window");

export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Missing Fields", "Please fill in all the fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created successfully!");
      router.replace("/signin");
    } catch (error) {
      Alert.alert("Sign-Up Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f8f0ff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>Fluppy Pet</Text>
        </View>

        <View style={styles.formBox}>
          {/* EMAIL */}
          <Text style={styles.label}>EMAIL</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome name="user" size={20} color="#5c3d99" style={styles.icon} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#5c3d99"
              style={styles.input}
            />
          </View>

          {/* PASSWORD */}
          <Text style={styles.label}>PASSWORD</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome name="lock" size={20} color="#5c3d99" style={styles.icon} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              secureTextEntry={!showPassword}
              placeholderTextColor="#5c3d99"
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome
                name={showPassword ? "eye" : "eye-slash"}
                size={20}
                color="#5c3d99"
              />
            </TouchableOpacity>
          </View>

          {/* CONFIRM PASSWORD */}
          <Text style={styles.label}>CONFIRM PASSWORD</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome name="lock" size={20} color="#5c3d99" style={styles.icon} />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm password"
              secureTextEntry={!showPassword}
              placeholderTextColor="#5c3d99"
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome
                name={showPassword ? "eye" : "eye-slash"}
                size={20}
                color="#5c3d99"
              />
            </TouchableOpacity>
          </View>

          {/* SIGN UP BUTTON */}
          <TouchableOpacity
            style={[styles.signUpBtn, loading && { opacity: 0.6 }]}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.signUpBtnText}>
              {loading ? "Creating Account..." : "SIGN UP"}
            </Text>
          </TouchableOpacity>

          {/* SIGN IN LINK */}
          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>ALREADY HAVE AN ACCOUNT? </Text>
            <TouchableOpacity onPress={() => router.push("/signin")}>
              <Text style={styles.signInText}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 30, alignItems: "center", justifyContent: "center" },
  logoContainer: { marginTop: 60, marginBottom: 30 },
  logo: { fontSize: 50, color: "#5c3d99", fontWeight: "bold", textAlign: "center" },
  formBox: {
    borderWidth: 2,
    borderColor: "#5c3d99",
    borderRadius: 15,
    padding: 25,
    backgroundColor: "#fff",
    elevation: 5,
    width: width * 0.9,
  },
  label: { color: "#5c3d99", fontWeight: "bold", marginBottom: 5, marginTop: 15 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#5c3d99",
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 45,
    marginBottom: 12,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, color: "#5c3d99", fontWeight: "600" },
  signUpBtn: {
    marginTop: 20,
    backgroundColor: "#5c3d99",
    borderRadius: 10,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  bottomTextContainer: { flexDirection: "row", justifyContent: "center", marginTop: 25 },
  bottomText: { color: "#999", fontWeight: "600" },
  signInText: { color: "#5c3d99", fontWeight: "bold" },
});
