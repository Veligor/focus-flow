import { NavigationContainer } from "@react-navigation/native";
import { RootTabs } from "./RootTabs";

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootTabs />
    </NavigationContainer>
  );
};
