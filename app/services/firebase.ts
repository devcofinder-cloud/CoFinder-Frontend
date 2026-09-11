import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import {
  getMessaging,
  isSupported,
  Messaging,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAPfR_r8Vtk4LL3If6MMDDO9JgCGCeqc5Y",
  authDomain: "cofinder-4ac93.firebaseapp.com",
  projectId: "cofinder-4ac93",
  storageBucket: "cofinder-4ac93.firebasestorage.app",
  messagingSenderId: "1072067939537",
  appId: "1:1072067939537:web:5979e12aa402d797c889f0",
  measurementId: "G-PRLBB4H139"
};

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp(firebaseConfig);

export const getFirebaseMessaging =
  async (): Promise<Messaging | null> => {
    if (typeof window === "undefined") {
      return null;
    }

    const supported = await isSupported();

    if (!supported) {
      console.log("❌ Firebase Messaging not supported");
      return null;
    }

    return getMessaging(app);
  };


  export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;