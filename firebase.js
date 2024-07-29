import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyAbL9p2DaRj_V0mJVn5UKj1SqGbtq3nD2s",
  authDomain: "indigo-hackathon.firebaseapp.com",
  projectId: "indigo-hackathon",
  storageBucket: "indigo-hackathon.appspot.com",
  messagingSenderId: "816441116277",
  appId: "1:816441116277:web:1e5c292ff800ed28149a3c",
  measurementId: "G-0CCTK9XFW4",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
