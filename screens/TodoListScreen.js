import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";

export default function TodoListScreen({ navigation }) {
  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const openModal = (todo) => {
    setSelectedTodo(todo);
    setModalVisible(true);
  };

  const fetchTodos = async () => {
    const res = await fetch("https://dummyjson.com/todos?limit=10");
    const data = await res.json();
    setTodos(data.todos);
  };

  const deleteTodo = async (id) => {
    await fetch(`https://dummyjson.com/todos/${id}`, {
      method: "DELETE",
    });
    fetchTodos(); // refresh list
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
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
                {item.todo}
              </Text>
              <Text>Status: {item.completed ? "Sudah Selesai" : "Belum Selesai"}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

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
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  Detail Todo
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  ID: {selectedTodo.id}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  Notes: {selectedTodo.todo}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  Status: {selectedTodo.completed ? "Sudah Selesai" : "Belum Selesai"}
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
