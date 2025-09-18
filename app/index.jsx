import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // adjust the path if needed

const { width } = Dimensions.get('window');

export default function App() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Signed in successfully!');
      router.replace('/goals');
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Cruelty Pet</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
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

        <Text style={styles.label}>PASSWORD</Text>
        <View style={styles.inputWrapper}>
          <FontAwesome name="lock" size={20} color="#5c3d99" style={styles.icon} />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
            placeholderTextColor="#5c3d99"
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>FORGOT PASSWORD?</Text>
        </TouchableOpacity>

        {/* Sign-in button */}
        <TouchableOpacity style={styles.signinBtn} onPress={handleSignIn}>
          <Text style={styles.signinBtnText}>SIGN IN</Text>
        </TouchableOpacity>

        <View style={styles.orRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR USE</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <FontAwesome name="facebook" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <AntDesign name="twitter" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <FontAwesome name="google-plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>DON'T HAVE AN ACCOUNT? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.signUpText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// (your styles remain unchanged)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 40,
    marginBottom: 30,
  },
  logo: {
    fontSize: 50,
    color: '#5c3d99',
    fontWeight: 'bold',
  },
  form: {
    width: width * 0.8,
  },
  label: {
    color: '#5c3d99',
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5c3d99',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 45,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#5c3d99',
    fontWeight: '600',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: 6,
  },
  forgotText: {
    color: '#5c3d99',
    fontSize: 12,
  },
  signinBtn: {
    marginTop: 20,
    backgroundColor: '#5c3d99',
    borderRadius: 6,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 12,
    color: '#999',
    fontWeight: 'bold',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialBtn: {
    backgroundColor: '#5c3d99',
    width: 50,
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  bottomText: {
    color: '#999',
    fontWeight: '600',
  },
  signUpText: {
    color: '#5c3d99',
    fontWeight: 'bold',
  },
});
