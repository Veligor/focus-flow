import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTasksStore } from "../../../store/tasksStore";
import { useNavigation } from "@react-navigation/native";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const tasks = useTasksStore((s) => s.tasks);

  const completed = tasks.filter((t) => t.completed).length;

  // ... (импорты и начало компонента)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Сегодня</Text>

      {/* Задачи */}
      <Pressable
        android_ripple={{ color: "#eeeeee" }}
        style={({ pressed }) => [styles.card, { opacity: pressed ? 0.7 : 1 }]}
        onPress={() => navigation.navigate("Tasks" as never)}
      >
        <Text style={styles.cardTitle}>Задачи</Text>
        <Text style={styles.stat}>
          Выполнено: {completed} / {tasks.length}
        </Text>
      </Pressable>

      {/* Фокус */}
      <Pressable
        android_ripple={{ color: "#eeeeee" }}
        style={({ pressed }) => [styles.card, { opacity: pressed ? 0.7 : 1 }]}
        onPress={() => navigation.navigate("Pomodoro" as never)}
      >
        <Text style={styles.cardTitle}>Фокус</Text>
        <Text style={styles.stat}>0 сессий</Text>
      </Pressable>

      {/* Привычки */}
      <Pressable
        android_ripple={{ color: "#eeeeee" }}
        style={({ pressed }) => [styles.card, { opacity: pressed ? 0.7 : 1 }]}
        onPress={() => navigation.navigate("Habits" as never)}
      >
        <Text style={styles.cardTitle}>Привычки</Text>
        <Text style={styles.stat}>0 выполнено</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" }, // Добавлены кавычки
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000", // Для iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: { fontSize: 16, color: "#666", marginBottom: 6 },
  stat: { fontSize: 22, fontWeight: "bold", color: "#333" },
});
