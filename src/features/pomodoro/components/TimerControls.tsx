import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { playButtonHaptic } from "../../../utils/feedback/feedback";


interface Props {
  isRunning: boolean;
  color: string;
  onStartPause: () => void;
  onReset: () => void;
}

export const TimerControls: React.FC<Props> = ({
  isRunning,
  color,
  onStartPause,
  onReset,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={async () => {
          await playButtonHaptic(); 
          onStartPause(); 
        }}
        style={({ pressed }) => [
          styles.mainButton,
          { backgroundColor: color },
          pressed && { opacity: 0.7 },
        ]}
      >
        <Text style={styles.buttonText}>{isRunning ? "Pause" : "Start"}</Text>
      </Pressable>

      <Pressable onPress={async () => {
          await playButtonHaptic();
          onReset();
        }} style={styles.resetButton}>
        <Text style={styles.resetText}>Reset</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    gap: 16,
    marginTop: 40,
  },
  mainButton: {
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 100, 
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  resetButton: {
    paddingVertical: 10,
  },
  resetText: {
    fontSize: 16,
    color: "#999",
  },
});
