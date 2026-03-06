import { create } from "zustand";
import { PomodoroState } from "../features/pomodoro/types";

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export const usePomodoroStore = create<PomodoroState>((set, get) => ({
  mode: "work",
  timeLeft: WORK_TIME,
  isRunning: false,
  totalDuration: WORK_TIME,

  start: () => set({ isRunning: true }),

  pause: () => set({ isRunning: false }),

  reset: () =>
    set({
      mode: "work",
      timeLeft: WORK_TIME,
      totalDuration: WORK_TIME,
      isRunning: false,
    }),

  tick: () => {
    const { timeLeft, mode } = get();

    if (timeLeft <= 1) {
      const nextMode = mode === "work" ? "break" : "work";
      const nextDuration = nextMode === "work" ? WORK_TIME : BREAK_TIME;

      set({
        mode: nextMode,
        timeLeft: nextDuration,
        totalDuration: nextDuration,
      });
      return;
    }

    set({ timeLeft: timeLeft - 1 });
  },
}));

export const usePomodoroTime = () =>
  usePomodoroStore((state) => state.timeLeft);

export const usePomodoroMode = () => usePomodoroStore((state) => state.mode);

export const usePomodoroIsRunning = () =>
  usePomodoroStore((state) => state.isRunning);

export const usePomodoroActions = () =>
  usePomodoroStore((state) => ({
    start: state.start,
    tick: state.tick,
    pause: state.pause,
    reset: state.reset,
  }));
