import { Tables } from "@/lib/types/database.types";
import { clsx, type ClassValue } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrencyInWon(num: number) {
  const result = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(num);
  return result.replace("₩", "₩ ");
}

export function categoriesOrder(categories: Tables<"categories">[]) {
  const uniq_cat = [
    ...new Map(categories?.map((item) => [item["id"], item])).values(),
  ];
  const cat_order = uniq_cat.sort((a, b) => a.display_order - b.display_order);

  return cat_order;
}

export function eventDatesDisplay(date_start: string, date_end: string | null) {
  if (date_end) {
    const startYear = dayjs(date_start).get("year");
    const endYear = dayjs(date_end).get("year");
    const startMonth = dayjs(date_start).get("month");
    const endMonth = dayjs(date_end).get("month");
    if (startYear === endYear && startMonth === endMonth) {
      return (
        dayjs(date_start).format("YYYY년 M월 D") +
        "-" +
        dayjs(date_end).format("D일")
      );
    } else if (startYear === endYear) {
      return (
        dayjs(date_start).format("YYYY년 M월 D일") +
        " - " +
        dayjs(date_end).format("M월 D일")
      );
    } else if (startYear !== endYear) {
      return (
        dayjs(date_start).format("YYYY년 M월 D일") +
        " - " +
        dayjs(date_end).format("YYYY년 M월 D일")
      );
    }
  } else {
    return dayjs(date_start).format("YYYY년 MM월 DD일 HH시");
  }
}
