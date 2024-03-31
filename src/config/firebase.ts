import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBw-lHx-DgpckF-TKBUAisklCCpeoGAmZc",
  authDomain: "fir-test-ae0f7.firebaseapp.com",
  projectId: "fir-test-ae0f7",
  storageBucket: "fir-test-ae0f7.appspot.com",
  messagingSenderId: "58399371582",
  appId: "1:58399371582:web:cd0c4aee33e60dc8a27c6f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
