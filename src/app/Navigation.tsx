import { NavigationContainer } from "@react-navigation/native";
import { RootTabs } from "./RootTabs";
import { PomodoroTimer } from "../features/pomodoro/PomodoroTimer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./../navigation/NavigationTypes";

import React from "react";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={RootTabs} />

        <Stack.Screen
          name="Pomodoro"
          component={PomodoroTimer}
          options={{
            headerShown: true,
            title: "Фокус",
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
