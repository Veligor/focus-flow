import { NavigationContainer } from "@react-navigation/native";
import { RootTabs } from "./RootTabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./../navigation/NavigationTypes";


const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootTabs />
    </NavigationContainer>
  );
};
