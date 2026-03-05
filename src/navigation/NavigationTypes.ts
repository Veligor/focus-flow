export type RootStackParamList = {
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