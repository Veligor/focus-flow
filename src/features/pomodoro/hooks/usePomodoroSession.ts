import { useEffect } from "react";
import { AppState } from "react-native";
import { usePomodoroStore } from "../../../store/usePomodoroStore";
import { useFocusSessionStore } from "../../focusSessions/store/focusSessionStore";
import {
  schedulePomodoroNotification,
  cancelPomodoroNotification,
} from "../../shared/services/notifications"; 

export const usePomodoroSession = () => {
  const { start, pause, reset, tick, timeLeft, isRunning } = usePomodoroStore();
  const { startSession, completeSession } = useFocusSessionStore();

  // 1. ТИКЕР: Чтобы цифры на экране менялись каждую секунду
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    } else if (isRunning && timeLeft <= 0) {
      // Если время вышло — завершаем сессию
      completeSession();
      reset();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, tick, completeSession, reset]);

  // 2. ФОН: Синхронизация времени при возврате в приложение
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      // Если приложение вернулось из фона в активный режим
      if (nextState === "active" && isRunning) {
        tick(); // даем стору команду обновить время
      }
    });
    
    return () => subscription.remove();
  }, [isRunning, tick]);

  const startPomodoro = async (taskId?: string) => {
    start();
    startSession(taskId);
    await schedulePomodoroNotification(timeLeft);
  };

  const pausePomodoro = async () => {
    pause();
    await cancelPomodoroNotification();
  };

  const resetPomodoro = async () => {
    if (isRunning) {
      completeSession();
    }
    reset();
    await cancelPomodoroNotification();
  };

  return {
    startPomodoro,
    pausePomodoro,
    resetPomodoro,
    timeLeft,
    isRunning,
  };
};
