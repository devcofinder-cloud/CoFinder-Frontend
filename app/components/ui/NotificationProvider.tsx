"use client";

import { useEffect } from "react";

import {
  getFCMToken,
  saveFCMToken,
} from "@/app/services/notification.service";

export default function NotificationProvider() {
  useEffect(() => {
    const setup = async () => {
      console.log("🚀 FCM setup started");

      const token = await getFCMToken();

      if (!token) {
        console.log("❌ No FCM token");
        return;
      }

      console.log("📌 Token received");

      await saveFCMToken(token);

      console.log("🎉 FCM TOKEN SAVED SUCCESSFULLY");
    };

    setup();
  }, []);

  return null;
}