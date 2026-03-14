import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";

let sound: Audio.Sound | null = null;

export const playButtonHaptic = async () => {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

export const playSuccessHaptic = async () => {
  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

export const playTimerEndSound = async () => {
  try {
    if (!sound) {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("../../../assets/sound/timer-complete.mp3"),
      );

      sound = newSound;
    }

    await sound.replayAsync();
  } catch (error) {
    console.log("Sound error:", error);
  }
};
