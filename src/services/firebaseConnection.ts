import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0ECVKODECwA-F45J_50kNmIBZUQnxDjo",
  authDomain: "linktree-922c7.firebaseapp.com",
  projectId: "linktree-922c7",
  storageBucket: "linktree-922c7.appspot.com",
  messagingSenderId: "1052198793741",
  appId: "1:1052198793741:web:8543ace7eea70e5176db44",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
