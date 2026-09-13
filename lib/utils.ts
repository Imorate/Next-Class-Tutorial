import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US").format(price);
}

export function getPriceWithDiscount(price: number, discount: number): number {
  if (discount > 100 || discount <= 0) {
    throw Error("Invalid discount argument");
  }
  return (price * (100 - discount)) / 100;
}
