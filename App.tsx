import { StatusBar } from "expo-status-bar";
import { AppNavigator } from "./src/app/Navigation";

export default function App() {
  return (
    <>
      <AppNavigator />
      <StatusBar style="auto" />
    </>
  );
}