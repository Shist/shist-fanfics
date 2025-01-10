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
  query,
  where,
  orderBy,
  type Timestamp,
} from "firebase/firestore/lite";
import { LoadingState, type IFanfic } from "@/types";

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

function convertFirestoreTimestampToDate(timestamp: Timestamp): Date {
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
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

async function loadFanficsOfFieldFromFirebase(attractorField: string) {
  const db = getFirestore();
  const queryByAttractorField = query(
    collection(db, "fanfics"),
    where("attractorField", "==", attractorField),
    orderBy("date")
  );
  const fanficsSnapshot = await getDocs(queryByAttractorField);

  const fanficsInfoArr: IFanfic[] = fanficsSnapshot.docs.map((doc) => {
    const fanficData = doc.data();

    fanficData.date = convertFirestoreTimestampToDate(fanficData.date);

    return {
      id: doc.id,
      body: {
        loadingState: LoadingState.NOT_LOADED,
        paragraphs: [],
      },
      ...(fanficData as Omit<IFanfic, "id" | "body">),
    };
  });

  return fanficsInfoArr;
}

export {
  onFirebaseAuthStateChanged,
  signUpUserToFirebase,
  signInUserToFirebase,
  signOutUserFromFirebase,
  loadFanficsOfFieldFromFirebase,
};
