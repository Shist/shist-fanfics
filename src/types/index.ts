import { type Ref } from "vue";

export enum LoadingState {
  LOADING,
  LOADED,
  ERROR,
}

export enum BodyLoadingState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
  ACCESS_ERROR,
}

export interface IHeroReplic {
  color: string;
  hero: string;
  replic: string;
}

export interface IFanficBody {
  loadingState: BodyLoadingState;
  paragraphs: (string | IHeroReplic)[];
}

export interface IFanfic {
  id: string;
  isConfidential: boolean;
  attractorField: string;
  date: Date;
  isHentai: boolean;
  isPsychopathic: boolean;
  title: string;
  body: IFanficBody;
}

export interface IFanficsMap {
  alpha: IFanfic[];
  beta: IFanfic[];
  gamma: IFanfic[];
  delta: IFanfic[];
  epsilon: IFanfic[];
}

export function isAttractorField(key: string): key is keyof IFanficsMap {
  return ["alpha", "beta", "gamma", "delta", "epsilon"].includes(key);
}

export interface IUser {
  uid: string;
  email: string;
  isImportant: boolean | "loading" | "loadingError";
}

export interface IUserFromFirebaseDatabase {
  email: string;
  isImportant: boolean;
}

export interface ISignUpStateRef {
  email: Ref<string>;
  password: Ref<string>;
  repeatPassword: Ref<string>;
}

export interface IFirebaseError extends Error {
  code: string;
}
