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

      <Pressable
        onPress={async () => {
          await playButtonHaptic();
          onReset();
        }}
        style={styles.resetButton}
      >
        <Text style={styles.resetText}>Reset</Text>
      </Pressable>
    </View>
  ); 
}; 
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginTop: 40,
  },
  mainButton: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    minWidth: 150,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  resetButton: {
    padding: 10,
  },
  resetText: {
    color: "#666",
    fontSize: 16,
  },
});
