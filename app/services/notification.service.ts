import { getToken } from "firebase/messaging";
import { getFirebaseMessaging } from "@/app/services/firebase";
import api from "@/app/lib/axios";

export const getFCMToken = async (): Promise<string | null> => {
  try {
    if (typeof window === "undefined") {
      return null;
    }

    if (!("Notification" in window)) {
      console.log("❌ Notifications not supported");
      return null;
    }

    // Permission already blocked
    if (Notification.permission === "denied") {
      console.log("❌ Notification permission blocked");
      return null;
    }

    // Ask permission
    if (Notification.permission === "default") {
      const permission =
        await Notification.requestPermission();

      if (permission !== "granted") {
        console.log("❌ Permission denied");
        return null;
      }
    }

    const messaging = await getFirebaseMessaging();

    if (!messaging) {
      console.log("❌ Firebase Messaging not supported");
      return null;
    }

    // Firebase service worker
    const registration =
      await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );

    console.log("✅ Service worker registered");

    // Generate token
    const token = await getToken(
      messaging,
      {
        serviceWorkerRegistration: registration,
      }
    );

    if (!token) {
      console.log("❌ FCM token not generated");
      return null;
    }

    console.log("🔥 FCM TOKEN:", token);

    return token;
  } catch (error) {
    console.error("❌ FCM token error:", error);
    return null;
  }
};

export const saveFCMToken = async (
  token: string
): Promise<void> => {
  try {
    console.log("📤 Sending token to backend...");

    const response = await api.post(
      "/user/fcm-token",
      {
        token,
      }
    );

    console.log(
      "✅ FCM token saved:",
      response.data
    );
  } catch (error: any) {
    console.error(
      "❌ Failed to save FCM token"
    );

    console.error(
      "Status:",
      error?.response?.status
    );

    console.error(
      "Response:",
      error?.response?.data
    );

    throw error;
  }
};