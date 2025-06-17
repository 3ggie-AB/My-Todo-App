import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";

export default function TodoListScreen() {
  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);
  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true); 

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const openModal = (todo) => {
    setSelectedTodo(todo);
    setModalVisible(true);
  };

  const fetchTodos = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`
      );
      const data = await res.json();
      if (data.todos.length > 0) {
        setTodos((prev) => [...prev, ...data.todos]);
        setSkip((prev) => prev + limit);
      } else {
        setHasMore(false); // tidak ada data lagi
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ margin: 10 }} />;
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        ref={flatListRef}
        data={todos}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <View
              style={{
                marginVertical: 10,
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 6,
              }}
            >
              <Text
                style={[
                  { fontSize: 16 },
                  item.completed && {
                    textDecorationLine: "line-through",
                    color: "gray",
                  },
                ]}
              >
                {item.id}. {item.todo}
              </Text>
              <Text>
                Status: {item.completed ? "Sudah Selesai" : "Belum Selesai"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={renderFooter}
        onEndReached={fetchTodos}
        onEndReachedThreshold={0.5} // 0.5 = saat 50% dari bawah
      />

      <View
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
          flexDirection: "column",
          gap: 10,
        }}
      >
        <TouchableOpacity
          onPress={scrollToTop}
          style={{
            backgroundColor: "#007bff",
            padding: 10,
            borderRadius: 50,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>↑ Atas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={scrollToBottom}
          style={{
            backgroundColor: "#28a745",
            padding: 10,
            borderRadius: 50,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>↓ Bawah</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
            }}
          >
            {selectedTodo && (
              <>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
                >
                  Detail Todo
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 5 }}>
                  ID: {selectedTodo.id}
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 5 }}>
                  Notes: {selectedTodo.todo}
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 5 }}>
                  Status:{" "}
                  {selectedTodo.completed ? "Sudah Selesai" : "Belum Selesai"}
                </Text>
                <Button title="Tutup" onPress={() => setModalVisible(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
