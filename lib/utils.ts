import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
  return price + "₸"
}

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export async function searchProducts(query) {
  const baseUrl = 'https://gorgeous-captain-cd0a26631f.strapiapp.com/api/products';

  // если строка пустая — просто вернуть все продукты
  if (!query.trim()) {
    const res = await fetch(`${baseUrl}?populate=*`);
    const data = await res.json();
    return data.data;
  }

  // формируем корректный фильтр OR
  const params = new URLSearchParams();
  params.append('filters[$or][0][name][$containsi]', query);
  params.append('filters[$or][1][description][$containsi]', query);
  params.append('populate', '*');

  const res = await fetch(`${baseUrl}?${params.toString()}`);
  const data = await res.json();

  return data.data;
}