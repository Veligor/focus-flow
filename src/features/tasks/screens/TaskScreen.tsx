import {
  View,
  Text,
  FlatList,
  Pressable,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import { useState, useRef } from "react";
import { useTasksStore } from "../../../store/tasksStore";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";


export const TasksScreen = () => {
  const { tasks, addTask, toggleTask, removeTask, updateTask } =
    useTasksStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [currentId, setCurrentId] = useState<string | null>(null);
  
  const inputRef = useRef<TextInput>(null);

  // Открыть модалку для создания
  const openAddModal = () => {
    setCurrentId(null);
    setTitle("");
    setModalVisible(true);
  };

  // Открыть модалку для редактирования
  const openEditModal = (id: string, text: string) => {
    setCurrentId(id);
    setTitle(text);
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!title.trim()) return;

    if (currentId) {
      updateTask(currentId, title);
    } else {
      addTask(title);
    }

    setTitle("");
    setModalVisible(false);
  };

  const renderRightActions = (item: any) => (
    <View style={styles.swipeContainer}>
      <Pressable
        onPress={() => openEditModal(item.id, item.title)}
        style={[styles.swipeButton, styles.btnEdit]}
      >
        <Text style={styles.btnText}>Изм.</Text>
      </Pressable>
      <Pressable
        onPress={() => removeTask(item.id)}
        style={[styles.swipeButton, styles.btnDelete]}
      >
        <Text style={styles.btnText}>Удал.</Text>
      </Pressable>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Swipeable renderRightActions={() => renderRightActions(item)}>
              <Pressable
                onPress={() => toggleTask(item.id)}
                style={styles.taskItem}
              >
                <Text
                  style={[
                    styles.taskText,
                    item.completed && styles.completedTask,
                  ]}
                >
                  {item.title}
                </Text>
              </Pressable>
            </Swipeable>
          )}
        />
        <Pressable
          style={({ pressed }) => [
            styles.fab,
            pressed && { transform: [{ scale: 0.95 }] },
          ]}
          onPress={openAddModal}
        >
          <Text style={styles.fabText}>+</Text>
        </Pressable>
        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          onShow={() => {
            setTimeout(() => {
              inputRef.current?.focus();
            }, 50);
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {currentId ? "Редактировать" : "Новая задача"}
              </Text>

              <TextInput
                ref={inputRef}
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
                  onPress={handleSave}
                >
                  <Text style={styles.btnText}>Сохранить</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  addButton: {
    backgroundColor: "#5856D6",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  addButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  taskItem: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    marginVertical: 6,
    elevation: 1,
  },
  taskText: { fontSize: 16, color: "#333" },
  completedTask: { textDecorationLine: "line-through", color: "#aaa" },

  // Свайп стили
  swipeContainer: { flexDirection: "row", marginVertical: 6 },
  swipeButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    borderRadius: 12,
    marginLeft: 8,
  },
  btnEdit: { backgroundColor: "#4CAF50" },
  btnDelete: { backgroundColor: "#ff3b30" },

  // Модалка
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
    color: "#000",
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  btn: { flex: 0.48, padding: 12, borderRadius: 10, alignItems: "center" },
  btnSave: { backgroundColor: "#5856D6" },
  btnCancel: { backgroundColor: "#8E8E93" },
  btnText: { color: "white", fontWeight: "600" },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#5856D6",
    justifyContent: "center",
    alignItems: "center",

    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  fabText: {
    color: "white",
    fontSize: 32,
    lineHeight: 34,
    fontWeight: "bold",
  },
});
