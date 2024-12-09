import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAEQEVk4KF18-teKIB9tUtL7adBCal9ytA",
  authDomain: "proud-lamp-436713-v1.firebaseapp.com",
  projectId: "proud-lamp-436713-v1",
  storageBucket: "proud-lamp-436713-v1.firebasestorage.app",
  messagingSenderId: "733400664896",
  appId: "1:733400664896:web:bf572ceb1ecc45144d48a5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
