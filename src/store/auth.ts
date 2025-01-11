import { ref } from "vue";
import { defineStore } from "pinia";
import {
  signUpUserToFirebase,
  signInUserToFirebase,
  signOutUserFromFirebase,
  loadUserAccessInfoFromFirbase,
} from "@/services/firebase";
import { type IUser } from "@/types";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<IUser | null>(null);

  const setBaseUserInfo = (userUid: string, userEmail: string) => {
    if (user.value) {
      user.value.uid = userUid;
      user.value.email = userEmail;
    } else {
      user.value = {
        uid: userUid,
        email: userEmail,
        isImportant: "loading",
      };
    }
  };

  const setUserImportance = (
    isUserImportant: boolean | "loading" | "loadingError"
  ) => {
    if (user.value) {
      user.value.isImportant = isUserImportant;
    }
  };

  const signUpUser = async (email: string, password: string) => {
    const authServerData = await signUpUserToFirebase(email, password);

    if (authServerData) {
      setBaseUserInfo(authServerData.user.uid, authServerData.user.email ?? "");
      setUserImportance(false);
    }
  };

  const signInUser = async (email: string, password: string) => {
    const authServerData = await signInUserToFirebase(email, password);

    setBaseUserInfo(authServerData.user.uid, authServerData.user.email ?? "");

    loadUserAccessInfoFromFirbase()
      .then((isUserImportant) => {
        setUserImportance(isUserImportant);
      })
      .catch(() => {
        setUserImportance("loadingError");
      });
  };

  const signOutUser = async () => {
    user.value = null;

    await signOutUserFromFirebase();
  };

  return {
    user,
    setBaseUserInfo,
    setUserImportance,
    signUpUser,
    signInUser,
    signOutUser,
  };
});
