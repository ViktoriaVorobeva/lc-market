import { Advertisment } from "../types";

export function findAdvertisement(advertisements: Advertisment[], id?: string) {
    if (!id) {
      return;
    }
    return advertisements.find((advertisement) => advertisement.id === id);
  }