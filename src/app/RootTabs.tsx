import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TasksScreen } from "../../src/features/tasks/screens/TaskScreen";
import { HabitsScreen } from "../../src/features/tasks/screens/HabitsScreen";
import { PomodoroScreen } from "../../src/features/tasks/screens/PomodoroScreen";
import { StatsScreen } from "../../src/features/tasks/screens/StatsScreen";
import { HomeScreen } from "../features/home/screens/HomeScreen";

const Tab = createBottomTabNavigator();

export const RootTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Habits" component={HabitsScreen} />
      <Tab.Screen name="Pomodoro" component={PomodoroScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
    </Tab.Navigator>
  );
};
