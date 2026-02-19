import { View, Text, Button, FlatList, Pressable } from "react-native";
import { useTasksStore } from "../../../store/tasksStore";

export const TasksScreen = () => {
  const { tasks, addTask, toggleTask, removeTask } = useTasksStore();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Добавить задачу" onPress={() => addTask("Новая задача")} />

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
    </View>
  );
};
