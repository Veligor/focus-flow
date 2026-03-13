import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  usePomodoroTime,
  usePomodoroMode,
  usePomodoroIsRunning,
  usePomodoroActions,
  usePomodoroProgress,
  usePomodoroModeColor,
} from "../../store/usePomodoroStore";
import { PomodoroAnimatedRing } from "../pomodoro/components/PomodoroProgressRing";
import { TimerDisplay } from "./components/TimerDisplay";
import { TimerControls } from "./components/TimerControls";

export const PomodoroTimer = () => {
  const timeLeft = usePomodoroTime();
  const mode = usePomodoroMode();
  const isRunning = usePomodoroIsRunning();
  const progress = usePomodoroProgress();
  const color = usePomodoroModeColor();
  const { start, pause, reset, tick } = usePomodoroActions();

  // Логика тика таймера
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => tick(), 1000);
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  return (
    <View style={styles.container}>
      {/* 1. Заголовок режима */}
      <Text style={styles.modeText}>
        {mode === "work" ? "💻 Focus" : "☕ Break"}
      </Text>

      {/* 2. Центрированная область с кольцом и временем */}
      <View style={styles.timerWrapper}>
        <PomodoroAnimatedRing progress={progress} color={color} size={280} />
        <View style={styles.displayOverlay}>
          <TimerDisplay timeLeft={timeLeft} />
        </View>
      </View>

      {/* 3. Кнопки управления */}
      <TimerControls
        isRunning={isRunning}
        color={color}
        onStartPause={isRunning ? pause : start}
        onReset={reset}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  modeText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#666",
    marginBottom: 40,
  },
  timerWrapper: {
    width: 280,
    height: 280,
    justifyContent: "center",
    alignItems: "center",
  },
  displayOverlay: {
    position: "absolute", 
    justifyContent: "center",
    alignItems: "center",
  },
});
