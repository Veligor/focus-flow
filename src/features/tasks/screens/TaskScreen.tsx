import {
  View,
  Text,
  Button,
  FlatList,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import { useState } from "react";
import { useTasksStore } from "../../../store/tasksStore";

export const TasksScreen = () => {
  const { tasks, addTask, toggleTask, removeTask } = useTasksStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");

  const handleAddTask = () => {
    if (!title.trim()) return;

    addTask(title);
    setTitle("");
    setModalVisible(false);
  };
  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Кнопка открытия */}
      <Button title="Добавить задачу" onPress={() => setModalVisible(true)} />

      {/* Список */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => toggleTask(item.id)}
            onLongPress={() => removeTask(item.id)}
            style={{
              padding: 16,
              marginVertical: 6,
              backgroundColor: "#eee",
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                textDecorationLine: item.completed ? "line-through" : "none",
              }}
            >
              {item.title}
            </Text>
          </Pressable>
        )}
      />

      {/* Modal создания */}
      <Modal visible={modalVisible} animationType="slide">
        <View
          style={{
            flex: 1,
            padding: 16,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20, marginBottom: 12 }}>Новая задача</Text>

          <TextInput
            placeholder="Введите текст задачи"
            value={title}
            onChangeText={setTitle}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
            }}
          />

          <Button title="Сохранить" onPress={handleAddTask} />
          <Button title="Отмена" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};
