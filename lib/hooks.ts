import { useCallback, useMemo } from "react";

const normalize = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean);

const useFilterProducts = (
  products = [],
  categorie: string,
  query: string,
) => useMemo(() => {
  let result = products;

  console.log(categorie, 'categorie')

  // ===== ПОИСК =====
  if (query) {
    const normalizedQuery = query.trim().toLowerCase();
    const queryWords = normalize(normalizedQuery);

    return result.filter((product) => {
      const text = [
        product.title,
        product.name,
        product.description,
      ]
        .filter(Boolean)
        .join(" ");

      const productWords = normalize(text);

      // точное слово ИЛИ начало слова
      return queryWords.some((qWord) =>
        productWords.some(
          (pWord) =>
            pWord === qWord || pWord.startsWith(qWord)
        )
      );
    });
  }

      // ===== WISHLIST =====
    if (categorie === "wishlist") {
      const raw = localStorage.getItem("luxetable-wishlist");
      if (!raw) return [];

      try {
        const ids = JSON.parse(raw).state.items.map((i: { id: any; }) => i.id);
        return result.filter((p) => ids.includes(p.id));
      } catch {
        return [];
      }
    }

    // ===== КАТЕГОРИИ =====
    if (categorie === "Новинки") {
      return result.filter((p) => p.isNewArrival);
    }

    if (categorie === "Распродажа") {
      return result.filter((p) => p.oldPrice);
    }

    if (categorie) {
      return result.filter((p) => p.category === categorie);
    }

  return result;
}, [products, categorie, query]);

export {  useFilterProducts };
