import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Card, Text, useTheme } from 'react-native-paper';
import { saveToken } from '../services/storage';



export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter your email and password');
      return;
    }
    const token = 'token-' + Date.now();
    await saveToken(token);
    navigation.replace('Dashboard');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/415/415733.png' }}
        style={styles.logo}
      />
      <Card style={styles.card} elevation={4}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            Welcome Back 👋
          </Text>
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            left={<TextInput.Icon icon="email" />}
          />
          <TextInput
            label="Password"
            mode="outlined"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            left={<TextInput.Icon icon="lock" />}
          />
          <Button
            mode="contained"
            onPress={handleLogin}
            style={{ marginTop: 16, paddingVertical: 4 }}
          >
            Login
          </Button>
        </Card.Content>
      </Card>
      <Text style={{ marginTop: 24, color: theme.colors.onSurfaceVariant }}>
        Grocery Store App v1.0
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingHorizontal: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  card: {
    width: '100%',
    borderRadius: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
  },
});
