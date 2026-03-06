export type PomodoroMode = "work" | "break";

export interface PomodoroState {
  mode: PomodoroMode;
  timeLeft: number;
  isRunning: boolean;
  totalDuration: number;
  
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
}
