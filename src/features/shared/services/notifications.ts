import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

let scheduledId: string | null = null;

export const schedulePomodoroNotification = async (seconds: number) => {
  try {
    // 1. Давал ли нам пользователь разрешение присылать пуши раньше?
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // 2. Если не разрешено — Разрешить этому приложению присылать уведомления?
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // 3. Если пользователь отказал - Эй, без этого ты пропустишь конец сессии!
    if (finalStatus !== "granted") {
      Alert.alert(
        "Уведомления",
        "Разрешите уведомления в настройках, чтобы не пропустить конец сессии",
      );
      return;
    }

    // 4. Планирование уведомления
    scheduledId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Сессия завершена! 🍅",
        body: "Пора сделать перерыв и немного отдохнуть.",
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds,
      },
    });
  } catch (error) {
    console.error("Ошибка при планировании уведомления:", error);
  }
};

export const cancelPomodoroNotification = async () => {
  if (!scheduledId) return;
  try {
    await Notifications.cancelScheduledNotificationAsync(scheduledId);
    scheduledId = null;
  } catch (error) {``
    console.error("Ошибка при отмене уведомления:", error);
  }
};
