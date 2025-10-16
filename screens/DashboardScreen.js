import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Appbar, FAB, Card, Text, Button, Snackbar } from 'react-native-paper';
import { loadItems, saveItems, removeToken } from '../services/storage';

export default function DashboardScreen({ navigation, toggleTheme }) {
  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadAll);
    loadAll();
    return unsubscribe;
  }, [navigation]);

  const loadAll = async () => {
    const data = await loadItems();
    setItems(data);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAll();
    setRefreshing(false);
  };

  const removeItem = async (id) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    await saveItems(updated);
    showSnackbar('Item deleted!');
  };

  const logout = async () => {
    await removeToken();
    navigation.replace('Login');
  };

  const showSnackbar = (msg) => {
    setSnackbarMsg(msg);
    setSnackbarVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Grocery Dashboard" />
        <Appbar.Action icon="theme-light-dark" onPress={toggleTheme} />
        <Appbar.Action icon="logout" onPress={logout} />
      </Appbar.Header>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <Card style={styles.card} mode="elevated">
            <Card.Title
              title={item.name}
              subtitle={`Qty: ${item.qty} — ₹${item.price}`}
              right={(props) => (
                <Button
                  mode="text"
                  onPress={() =>
                    navigation.navigate('EditItem', { mode: 'edit', item })
                  }
                >
                  Edit
                </Button>
              )}
            />
            <Card.Actions>
              <Button
                icon="delete"
                textColor="red"
                onPress={() => removeItem(item.id)}
              >
                Delete
              </Button>
            </Card.Actions>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 40 }}>
            No items yet. Pull down to refresh or tap + to add.
          </Text>
        }
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('EditItem', { mode: 'add' })}
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        {snackbarMsg}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
});
