importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAPfR_rV8tk4LL3If6MMDDO9JgCGCeqc5Y",
  authDomain: "cofinder-4ac93.firebaseapp.com",
  projectId: "cofinder-4ac93",
  storageBucket: "cofinder-4ac93.firebasestorage.app",
  messagingSenderId: "1072067939537",
  appId: "1:1072067939537:web:5979e12aa402d797c889f0",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js]",
    payload
  );

  const title =
    payload.notification?.title ||
    "CoFinder";

  const options = {
    body:
      payload.notification?.body ||
      "You have a new notification",

    data: payload.data || {},
  };

  self.registration.showNotification(
    title,
    options
  );
});