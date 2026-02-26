import { View, Text, StyleSheet } from "react-native";
import { useTasksStore } from "../../../store/tasksStore";

export const HomeScreen = () => {
  const tasks = useTasksStore((s) => s.tasks);

  const completed = tasks.filter((t) => t.completed).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Сегодня</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Задачи</Text>
        <Text style={styles.stat}>
          {completed} / {tasks.length} выполнено
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Фокус</Text>
        <Text style={styles.stat}>0 сессий</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Привычки</Text>
        <Text style={styles.stat}>0 выполнено</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 6,
  },

  stat: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
});
