export type PomodoroMode = "work" | "break";

export interface PomodoroState {
  mode: PomodoroMode;
  timeLeft: number;
  isRunning: boolean;
  totalDuration: number;

  startTime: number | null;
  
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
}
