import { NavigationContainer } from "@react-navigation/native";
import { RootTabs } from "./RootTabs";
import { PomodoroTimer } from "../features/pomodoro/PomodoroTimer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./../navigation/NavigationTypes";

import React from "react";

const Stack = createNativeStackNavigator<RootStackParamList>();

// export const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <RootTabs />
//       <PomodoroTimer />
//     </NavigationContainer>
//   );
// };

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main" // Приложение начнется с Табов
        screenOptions={{ headerShown: false }} // Прячем заголовки Стека
      >
        {/* Экран 1: Главное меню (наш RootTabs) */}
        <Stack.Screen name="Main" component={RootTabs} />

        {/* Экран 2: Таймер (откроется на весь экран поверх Табов) */}
        <Stack.Screen
          name="Pomodoro"
          component={PomodoroTimer}
          options={{
            headerShown: true,
            title: "Фокус",
            presentation: "modal", // Опционально: выезжает снизу как карточка (iOS стиль)
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};