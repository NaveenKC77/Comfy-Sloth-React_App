import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { view, allProducts, filteredProducts } = useFilterContext();

  if (view === "grid") {
    return <GridView products={filteredProducts}></GridView>;
  } else {
    return <ListView products={filteredProducts}></ListView>;
  }
};

export default ProductList;
