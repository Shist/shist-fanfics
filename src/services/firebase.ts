import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  type User as IUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
} from "firebase/firestore/lite";
import { type IFanfic } from "@/types";

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
});

const auth = getAuth(firebaseApp);

function onFirebaseAuthStateChanged(initFoo: (user: IUser | null) => void) {
  onAuthStateChanged(auth, initFoo);
}

async function signUpUserToFirebase(email: string, password: string) {
  const auth = getAuth();

  const newUserInfo = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  if (!newUserInfo.user.uid) {
    return;
  }

  const db = getFirestore();

  await setDoc(doc(db, "users", newUserInfo.user.uid), {
    email,
    password,
    isImportant: false,
  });

  return newUserInfo;
}

async function signInUserToFirebase(email: string, password: string) {
  const auth = getAuth();

  const userInfo = await signInWithEmailAndPassword(auth, email, password);

  return userInfo;
}

async function signOutUserFromFirebase() {
  const auth = getAuth();

  await signOut(auth);
}

async function loadFanficsInfoFromFirebase() {
  const db = getFirestore();
  const fanficsCollection = collection(db, "fanfics");

  const fanficsSnapshot = await getDocs(fanficsCollection);

  const fanficsInfoArr: IFanfic[] = fanficsSnapshot.docs.map((doc) => {
    const fanficData = doc.data() as Omit<IFanfic, "id" | "body">;

    return {
      id: doc.id,
      body: "not loaded",
      ...fanficData,
    };
  });

  return fanficsInfoArr;
}

export {
  onFirebaseAuthStateChanged,
  signUpUserToFirebase,
  signInUserToFirebase,
  signOutUserFromFirebase,
  loadFanficsInfoFromFirebase,
};
