// screens/EditItemScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Card, TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { loadItems, saveItems } from '../services/storage';
import { LinearGradient } from 'expo-linear-gradient';

export default function EditItemScreen({ route, navigation }) {
  const { mode, item } = route.params || {};
  const [name, setName] = useState(item?.name ?? '');
  const [qty, setQty] = useState(String(item?.qty ?? '1'));
  const [price, setPrice] = useState(String(item?.price ?? '0'));
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  useEffect(() => {
    navigation.setOptions({ title: mode === 'edit' ? 'Edit Item' : 'Add Item' });
  }, []);

  const onSave = async () => {
    if (!name.trim()) {
      showSnackbar('Please enter item name');
      return;
    }

    const all = await loadItems();
    if (mode === 'edit') {
      const updated = all.map(i =>
        i.id === item.id ? { ...i, name, qty: Number(qty), price: Number(price) } : i
      );
      await saveItems(updated);
      showSnackbar('Item updated successfully!');
    } else {
      const newItem = { id: Date.now().toString(), name, qty: Number(qty), price: Number(price) };
      all.push(newItem);
      await saveItems(all);
      showSnackbar('Item added successfully!');
    }

    // Wait briefly then go back to Dashboard
    setTimeout(() => navigation.goBack(), 800);
  };

  const showSnackbar = (msg) => {
    setSnackbarMsg(msg);
    setSnackbarVisible(true);
  };

  return (
    <LinearGradient colors={['#a8e063', '#56ab2f']} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Card style={styles.card} elevation={5}>
            <Card.Content>
              <Text variant="headlineMedium" style={styles.title}>
                {mode === 'edit' ? 'Edit Grocery Item' : 'Add New Item'}
              </Text>

              <TextInput
                label="Item Name"
                mode="outlined"
                value={name}
                onChangeText={setName}
                style={styles.input}
                left={<TextInput.Icon icon="cart-outline" />}
              />

              <TextInput
                label="Quantity"
                mode="outlined"
                keyboardType="numeric"
                value={qty}
                onChangeText={setQty}
                style={styles.input}
                left={<TextInput.Icon icon="numeric" />}
              />

              <TextInput
                label="Price (₹)"
                mode="outlined"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
                style={styles.input}
                left={<TextInput.Icon icon="currency-inr" />}
              />

              <Button
                mode="contained"
                icon={mode === 'edit' ? 'content-save' : 'plus-circle'}
                onPress={onSave}
                style={styles.button}
              >
                {mode === 'edit' ? 'Update Item' : 'Add Item'}
              </Button>

              <Button
                mode="outlined"
                onPress={() => navigation.goBack()}
                style={{ marginTop: 8 }}
              >
                Cancel
              </Button>
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        {snackbarMsg}
      </Snackbar>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    borderRadius: 16,
    padding: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
  },
});
