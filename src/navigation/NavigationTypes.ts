export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  Tasks: undefined;
  Pomodoro: undefined;
  Habits: undefined;
  Stats: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}