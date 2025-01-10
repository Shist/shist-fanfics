import { type Ref } from "vue";

export interface IHeroReplic {
  color: string;
  hero: string;
  replic: string;
}

export interface IFanfic {
  id: string;
  attractorField: string;
  date: string;
  hentai: boolean;
  psychopathic: boolean;
  title: string;
  body: (string | IHeroReplic)[] | "not loaded";
}

export interface IUser {
  uid: string;
  email: string;
}

export interface ISignUpStateRef {
  email: Ref<string>;
  password: Ref<string>;
  repeatPassword: Ref<string>;
}

export interface IFirebaseError extends Error {
  code: string;
}
