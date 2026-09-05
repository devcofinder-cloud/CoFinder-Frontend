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
  console.log("[firebase-messaging-sw.js]", payload);

  const title = payload.data?.title || "CoFinder";

  const options = {
    body: payload.data?.body || "You have a new message",
    icon: "/icon-192.png",
    data: {
      url: payload.data?.url || "/",
      conversationId: payload.data?.conversationId,
    },
  };

  self.registration.showNotification(title, options);
});


self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url =
    event.notification.data?.url ||
    "/";

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    }).then((clientList) => {
      // Agar website already open hai
      for (const client of clientList) {
        if ("focus" in client) {
          client.navigate(url);
          return client.focus();
        }
      }

      // Agar website open nahi hai
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});