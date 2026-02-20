import {
  View,
  Text,
  FlatList,
  Pressable,
  Modal,
  TextInput,
  StyleSheet,
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
    <View style={styles.container}>
      {/* Кастомная кнопка "Добавить" */}
      <Pressable
        style={({ pressed }) => [
          styles.addButton,
          pressed && { opacity: 0.7 }, // Эффект нажатия
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Добавить задачу</Text>
      </Pressable>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => toggleTask(item.id)}
            onLongPress={() => removeTask(item.id)}
            style={styles.taskItem}
          >
            <Text
              style={[styles.taskText, item.completed && styles.completedTask]}
            >
              {item.title}
            </Text>
          </Pressable>
        )}
      />

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Новая задача</Text>

            <TextInput
              placeholder="Что нужно сделать?"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              placeholderTextColor="#999"
            />

            <View style={styles.row}>
              <Pressable
                style={[styles.btn, styles.btnCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.btnText}>Отмена</Text>
              </Pressable>

              <Pressable
                style={[styles.btn, styles.btnSave]}
                onPress={handleAddTask}
              >
                <Text style={styles.btnText}>Сохранить</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },

  // Стиль основной кнопки
  addButton: {
    backgroundColor: "#5856D6",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3, // Тень для Android
    shadowColor: "#000", // Тень для iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  addButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },

  taskItem: {
    padding: 16,
    marginVertical: 6,
    backgroundColor: "white",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },
  taskText: { fontSize: 16, color: "#333" },
  completedTask: { textDecorationLine: "line-through", color: "#aaa" },

  // Стили модалки
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "stretch",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  btn: { flex: 0.48, padding: 12, borderRadius: 10, alignItems: "center" },
  btnSave: { backgroundColor: "#5856D6" },
  btnCancel: { backgroundColor: "#ff3b30" },
  btnText: { color: "white", fontWeight: "600" },
});
