import { Advertisment } from "../types";

export const initialSettings: Advertisment[] = [];

const saveResultInLocalStorage = (key: string, data: Advertisment[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    localStorage.clear();
    localStorage.setItem(key, JSON.stringify(data));
  }
};

const getResultFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);

  if (value !== null) {
    try {
      return JSON.parse(value) as Advertisment[];
    } catch {
      return initialSettings;
    }
  }
  return initialSettings;
};

export { saveResultInLocalStorage, getResultFromLocalStorage };