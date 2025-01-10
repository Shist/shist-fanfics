import { type Ref } from "vue";

export enum LoadingState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export interface IHeroReplic {
  color: string;
  hero: string;
  replic: string;
}

export interface IFanficBody {
  loadingState: LoadingState;
  paragraphs: (string | IHeroReplic)[];
}

export interface IFanfic {
  id: string;
  attractorField: string;
  date: Date;
  hentai: boolean;
  psychopathic: boolean;
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
}

export interface ISignUpStateRef {
  email: Ref<string>;
  password: Ref<string>;
  repeatPassword: Ref<string>;
}

export interface IFirebaseError extends Error {
  code: string;
}
