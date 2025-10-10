import { useEffect, useRef, useState } from "react";
import { searchProducts } from "./utils";

export const useFilterProducts = (
  products, categorie, query, setLoading, setQuery, setCategorie
) => {
  const [filtProducts, setFiltProducts] = useState([])
  const isShowSearch = useRef(false);

  useEffect(() => {
    if (isShowSearch.current) {
      isShowSearch.current = false;
    }

    if (categorie) {
      setQuery("");
      isShowSearch.current = true;
    }
  }, [categorie, query])

  const getFiltProducts = () => {
    if (query && isShowSearch.current) {
      setLoading(true)
      setCategorie(null)
      let ids = []

      searchProducts(query).then((res) => {
        isShowSearch.current = true;
        setLoading(false)

        if (res.length === 0) {
          setFiltProducts([])
        }
        ids = res.map((p) => p.id)
        const filtered = products.filter(p => ids.includes(p.id))

        setFiltProducts(filtered);
      })

      return []
    }

    if (categorie === "wishlist") {
      const df = window.localStorage.getItem("luxetable-wishlist")
      const dfg = JSON.parse(df)
      const ids = dfg.state.items.map((item) => item.id)
      
      return products.filter((product) => ids.includes(product.id));
    }

    if (categorie === 'Новинки') {
      return products.filter((product) => product.isNewArrival);
    }
    
    if (categorie === 'Распродажа') {
      return products.filter((product) => product.oldPrice);
    }
    
    if (categorie) {
      return products.filter((product) => product.category === categorie);
    }
  }

  useEffect(() => {
    const ww = getFiltProducts()
    setFiltProducts(ww)
  }, [categorie, query, products])

  return filtProducts;
};
