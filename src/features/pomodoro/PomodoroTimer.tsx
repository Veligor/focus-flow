import { useEffect } from "react";
import {
  usePomodoroTime,
  usePomodoroMode,
  usePomodoroIsRunning,
  usePomodoroActions,
} from "../../store/usePomodoroStore";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { formatTime } from "../../utils/formatTime";

export const PomodoroTimer = () => {
  
  const timeLeft = usePomodoroTime();
  const mode = usePomodoroMode();
  const isRunning = usePomodoroIsRunning();
  const { start, pause, reset, tick } = usePomodoroActions();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, tick]);

  return (
    <View style={styles.container}>
      <Text style={styles.modeText}>
        {mode === "work" ? "💻 Focus" : "☕ Break"}
      </Text>

      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={isRunning ? pause : start}
          style={({ pressed }) => [
            styles.mainButton,
            { backgroundColor: isRunning ? "#FF9800" : "#4CAF50" },
            pressed && { opacity: 0.7 },
          ]}
        >
          <Text style={styles.buttonText}>{isRunning ? "Pause" : "Start"}</Text>
        </Pressable>

        <Pressable
          onPress={reset}
          style={({ pressed }) => [
            styles.resetButton,
            pressed && { backgroundColor: "#eee" },
          ]}
        >
          <Text style={styles.resetText}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", padding: 20 },
  timerText: {
    fontSize: 80,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#333",
  },
  modeText: { fontSize: 24, fontWeight: "500", color: "#666" },
  buttonContainer: { flexDirection: "row", alignItems: "center", gap: 20 },
  mainButton: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  resetButton: { padding: 15, borderRadius: 8 },
  resetText: { color: "#888", fontSize: 16 },
});
