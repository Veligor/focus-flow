import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatTime } from "../../../utils/formatTime";

interface Props {
  timeLeft: number;
}

export const TimerDisplay: React.FC<Props> = ({ timeLeft }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
  },
});