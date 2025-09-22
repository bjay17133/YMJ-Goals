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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const { width } = Dimensions.get("window");

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "You have signed in successfully!");
      router.replace("/goals");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
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
          
          <Text style={styles.label}>EMAIL</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome
              name="user"
              size={20}
              color="#5c3d99"
              style={styles.icon}
            />
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

        
          <Text style={styles.label}>PASSWORD</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome
              name="lock"
              size={20}
              color="#5c3d99"
              style={styles.icon}
            />
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

         
          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>FORGOT PASSWORD?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.signinBtn, loading && { opacity: 0.6 }]}
            onPress={handleSignIn}
            disabled={loading}
          >
            <Text style={styles.signinBtnText}>
              {loading ? "Signing In..." : "SIGN IN"}
            </Text>
          </TouchableOpacity>

       
          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>DON'T HAVE AN ACCOUNT? </Text>
            <TouchableOpacity onPress={() => router.push("/signup")}>
              <Text style={styles.signUpText}>SIGN UP</Text>
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
  logo: {
    fontSize: 50,
    color: "#5c3d99",
    fontWeight: "bold",
    textAlign: "center",
  },
  formBox: {
    borderWidth: 2,
    borderColor: "#5c3d99",
    borderRadius: 15,
    padding: 25,
    backgroundColor: "#fff",
    elevation: 5,
    width: width * 0.9,
  },
  label: {
    color: "#5c3d99",
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 15,
  },
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
  forgotBtn: { alignSelf: "flex-end", marginTop: 6 },
  forgotText: { color: "#5c3d99", fontSize: 12, fontWeight: "600" },
  signinBtn: {
    marginTop: 20,
    backgroundColor: "#5c3d99",
    borderRadius: 10,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  signinBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  bottomText: { color: "#999", fontWeight: "600" },
  signUpText: { color: "#5c3d99", fontWeight: "bold" },
});
