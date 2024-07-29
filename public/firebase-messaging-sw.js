importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAbL9p2DaRj_V0mJVn5UKj1SqGbtq3nD2s",
  authDomain: "indigo-hackathon.firebaseapp.com",
  projectId: "indigo-hackathon",
  storageBucket: "indigo-hackathon.appspot.com",
  messagingSenderId: "816441116277",
  appId: "1:816441116277:web:1e5c292ff800ed28149a3c",
  measurementId: "G-0CCTK9XFW4",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
