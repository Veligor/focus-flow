import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import { useTasksStore } from "../../../store/tasksStore";
import { useNavigation } from "@react-navigation/native";
import { isToday, isBefore, startOfDay } from "date-fns";
import {useState} from "react";

export const HomeScreen = () => {
const addTask = useTasksStore((s) => s.addTask);
const toggleTask = useTasksStore((state) => state.toggleTask);

const [quickTitle, setQuickTitle] = useState("");


  const navigation = useNavigation();
  const tasks = useTasksStore((s) => s.tasks);

  const completed = tasks.filter((t) => t.completed).length;

  // Задачи на сегодня
 const todayTasks = tasks.filter(
   (t) => t.dueDate && isToday(new Date(t.dueDate)),
 );

 const overdueTasks = tasks.filter(
   (t) =>
     t.dueDate &&
     isBefore(new Date(t.dueDate), startOfDay(new Date())) &&
     !t.completed,
 );

 const futureTasks = tasks.filter(
   (t) =>
     t.dueDate &&
     !isToday(new Date(t.dueDate)) &&
     !isBefore(new Date(t.dueDate), startOfDay(new Date())),
 );

  const todayCompleted = todayTasks.filter((t) => t.completed).length;

  // Прогресс дня (0 — 1)
  const progress =
    todayTasks.length > 0 ? todayCompleted / todayTasks.length : 0;

  // ... (импорты и начало компонента)
  const handleQuickAdd = () => {
    if (!quickTitle.trim()) return;

    addTask(quickTitle);
    setQuickTitle("");
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Сегодня</Text>

          {/* Задачи */}
          <Pressable
            android_ripple={{ color: "#eeeeee" }}
            style={({ pressed }) => [
              styles.card,
              { opacity: pressed ? 0.7 : 1 },
            ]}
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
            style={({ pressed }) => [
              styles.card,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => navigation.navigate("Pomodoro" as never)}
          >
            <Text style={styles.cardTitle}>Фокус</Text>
            <Text style={styles.stat}>0 сессий</Text>
          </Pressable>

          {/* Привычки */}
          <Pressable
            android_ripple={{ color: "#eeeeee" }}
            style={({ pressed }) => [
              styles.card,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => navigation.navigate("Habits" as never)}
          >
            <Text style={styles.cardTitle}>Привычки</Text>
            <Text style={styles.stat}>0 выполнено</Text>
          </Pressable>
          {/* Быстрое добавление */}
          <View style={styles.quickAdd}>
            <TextInput
              placeholder="Быстро добавить задачу..."
              value={quickTitle}
              onChangeText={setQuickTitle}
              style={styles.quickInput}
              placeholderTextColor="#999"
              onSubmitEditing={handleQuickAdd}
              returnKeyType="done"
            />

            <Pressable
              style={({ pressed }) => [
                styles.quickButton,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={handleQuickAdd}
            >
              <Text style={styles.quickButtonText}>Добавить</Text>
            </Pressable>
          </View>

          {/* Сегодняшние задачи */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Сегодня</Text>

            {/* Progress */}
            {todayTasks.length > 0 && (
              <View style={styles.progressWrapper}>
                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${progress * 100}%` },
                    ]}
                  />
                </View>

                <Text style={styles.progressText}>
                  {todayCompleted} / {todayTasks.length} выполнено
                </Text>
              </View>
            )}

            {/* Список */}
            {todayTasks.length === 0 ? (
              <View style={styles.emptyWrapper}>
                <Text style={styles.emptyTitle}>🎉 Отличная работа!</Text>

                <Text style={styles.emptySubtitle}>На сегодня задач нет</Text>

                <Pressable
                  style={({ pressed }) => [
                    styles.emptyButton,
                    { opacity: pressed ? 0.8 : 1 },
                  ]}
                  onPress={() => navigation.navigate("Tasks" as never)}
                >
                  <Text style={styles.emptyButtonText}>Добавить задачу</Text>
                </Pressable>
              </View>
            ) : (
              todayTasks.slice(0, 3).map((task) => (
                <Pressable
                  key={task.id}
                  onPress={() => toggleTask(task.id)}
                  style={({ pressed }) => [
                    styles.taskRow,
                    { opacity: pressed ? 0.7 : 1 },
                  ]}
                >
                  <Text
                    style={[
                      styles.taskText,
                      task.completed && styles.completedTask,
                    ]}
                  >
                    {task.title}
                  </Text>
                </Pressable>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};;

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
  progressWrapper: {
    marginBottom: 12,
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#5856D6",
  },

  progressText: {
    marginTop: 6,
    fontSize: 14,
    color: "#666",
  },

  section: {
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  taskRow: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
  },

  taskText: {
    fontSize: 16,
    color: "#333",
  },

  completedTask: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },

  empty: {
    color: "#999",
    fontStyle: "italic",
  },
  quickAdd: {
    flexDirection: "row",
    marginBottom: 16,
  },

  quickInput: {
    flex: 1,
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },

  quickButton: {
    backgroundColor: "#5856D6",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 12,
  },

  quickButtonText: {
    color: "white",
    fontWeight: "600",
  },
  emptyWrapper: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    elevation: 1,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },

  emptySubtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 12,
  },

  emptyButton: {
    backgroundColor: "#5856D6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  emptyButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
