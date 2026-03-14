import { create } from "zustand";
import { PomodoroState } from "../features/pomodoro/types";
import { useShallow } from "zustand/react/shallow";
import {
  playSuccessHaptic,
  playTimerEndSound,
} from "../utils/feedback/feedback";

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export const usePomodoroStore = create<PomodoroState>((set, get) => ({
  mode: "work",
  timeLeft: WORK_TIME,
  isRunning: false,
  totalDuration: WORK_TIME,
  startTime: null,

  start: () => {
     const { timeLeft, totalDuration } = get();
    const now = Date.now();
 const elapsedInMs = (totalDuration - timeLeft) * 1000;
    set({
      isRunning: true,
      startTime: now - elapsedInMs,
    });
  },

  pause: () => {
    const { startTime, totalDuration } = get();

    if (!startTime) return;

    const elapsed = Math.floor((Date.now() - startTime) / 1000);

    const remaining = totalDuration - elapsed;

    set({
      isRunning: false,
      timeLeft: Math.max(remaining, 0),
      startTime: null,
    });
  },

  reset: () =>
    set({
      mode: "work",
      timeLeft: WORK_TIME,
      totalDuration: WORK_TIME,
      isRunning: false,
      startTime: null,
    }),

  tick: () => {
    const { startTime, totalDuration, mode } = get();

    if (!startTime) return;

    const elapsed = Math.floor((Date.now() - startTime) / 1000);

    const remaining = totalDuration - elapsed;

    if (remaining <= 0) {

          playSuccessHaptic();
          playTimerEndSound();
          
      const nextMode = mode === "work" ? "break" : "work";

      const nextDuration = nextMode === "work" ? WORK_TIME : BREAK_TIME;

      set({
        mode: nextMode,
        totalDuration: nextDuration,
        timeLeft: nextDuration,
        startTime: Date.now(),
      });

      return;
    }

    set({
      timeLeft: remaining,
    });
  },
}));

export const usePomodoroProgress = () =>
  usePomodoroStore((state) => {
    if (state.totalDuration <= 0) return 0;

    const progress =
      (state.totalDuration - state.timeLeft) / state.totalDuration;

    const clampedProgress = Math.max(0, Math.min(progress, 1));
    return parseFloat(clampedProgress.toFixed(4));
  });

export const usePomodoroTime = () =>
  usePomodoroStore((state) => state.timeLeft);

export const usePomodoroMode = () => usePomodoroStore((state) => state.mode);

export const usePomodoroIsRunning = () =>
  usePomodoroStore((state) => state.isRunning);

export const usePomodoroActions = () =>
  usePomodoroStore(
    useShallow((state) => ({
      start: state.start,
      tick: state.tick,
      pause: state.pause,
      reset: state.reset,
    })),
  );

export const usePomodoroModeColor = () =>
  usePomodoroStore((state) => {
    return state.mode === "work" ? "#F44336" : "#4CAF50";
  });
