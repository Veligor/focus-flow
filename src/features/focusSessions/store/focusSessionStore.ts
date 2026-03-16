import { create } from "zustand";
import { FocusSession } from "../types";
import { schedulePomodoroNotification, cancelPomodoroNotification } from "../../shared/services/notifications";

interface FocusSessionState {
  sessions: FocusSession[];
  currentSessionStart: number | null;
  currentTaskId: string | null;

  // Добавил durationSeconds, чтобы знать когда слать пуш
  startSession: (taskId?: string, durationSeconds?: number) => void;
  completeSession: () => void;
}

export const useFocusSessionStore = create<FocusSessionState>((set, get) => ({
  sessions: [],
  currentSessionStart: null,
  currentTaskId: null,

  startSession: (taskId, durationSeconds) => {
    set({
      currentSessionStart: Date.now(),
      currentTaskId: taskId || null,
    });

    // Если передали время, запускаем уведомление
    if (durationSeconds) {
      schedulePomodoroNotification(durationSeconds);
    }
  },

  completeSession: () => {
    const { currentSessionStart, currentTaskId, sessions } = get();
    if (!currentSessionStart) return;

    // Отменяем запланированное уведомление, так как мы завершили сессию (вручную или по таймеру)
    cancelPomodoroNotification();

    const completedAt = Date.now();
    const newSession: FocusSession = {
      id: crypto.randomUUID(),
      startedAt: currentSessionStart,
      completedAt,
      duration: Math.floor((completedAt - currentSessionStart) / 1000),
      taskId: currentTaskId || undefined,
    };

    set({
      sessions: [...sessions, newSession],
      currentSessionStart: null,
      currentTaskId: null,
    });
  },
}));
