import { ref } from "vue";
import { defineStore } from "pinia";
import {
  signUpUserToFirebase,
  signInUserToFirebase,
  signOutUserFromFirebase,
} from "@/services/firebase";
import { type IUser } from "@/types";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<IUser | null>(null);

  const setUserCredentials = (newUser: IUser) => {
    user.value = newUser;
  };

  const signUpUser = async (email: string, password: string) => {
    const authServerData = await signUpUserToFirebase(email, password);

    if (authServerData) {
      setUserCredentials({
        uid: authServerData.user.uid,
        email: authServerData.user.email ?? "",
      });
    }
  };

  const signInUser = async (email: string, password: string) => {
    const authServerData = await signInUserToFirebase(email, password);

    if (authServerData) {
      setUserCredentials({
        uid: authServerData.user.uid,
        email: authServerData.user.email ?? "",
      });
    }
  };

  const signOutUser = async () => {
    user.value = null;

    await signOutUserFromFirebase();
  };

  return {
    user,
    setUserCredentials,
    signUpUser,
    signInUser,
    signOutUser,
  };
});
