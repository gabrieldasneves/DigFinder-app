import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
  authDomain: "digfinder-fcf63.firebaseapp.com",
  projectId: "digfinder-fcf63",
  storageBucket: "digfinder-fcf63.firebasestorage.app",
  messagingSenderId: "337184838094",
  appId: "1:337184838094:web:827214c41bb58734a95b9f",
  measurementId: "G-QVEM5Q98FN",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
