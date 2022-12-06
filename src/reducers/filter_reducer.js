import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let tempMax = Math.max(
      ...action.payload.map((product) => {
        return product.price;
      })
    );

    return {
      ...state,
      allProducts: action.payload,
      filteredProducts: action.payload,
      filters: {
        ...state.filters,
        maxPrice: tempMax / 100,
        price: tempMax / 100,
      },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, view: "grid" };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, view: "list" };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filteredProducts } = state;
    let tempProducts = [];
    if (sort === "price-lowest") {
      tempProducts = filteredProducts.sort((a, b) => {
        // if (a.price < b.price) {
        //   return -1
        // }
        // if (a.price > b.price) {
        //   return 1
        // }
        // return 0
        return a.price - b.price;
      });
    }
    if (sort === "price-highest") {
      tempProducts = filteredProducts.sort((a, b) => {
        // if (b.price < a.price) {
        //   return -1
        // }
        // if (b.price > a.price) {
        //   return 1
        // }
        // return 0
        return b.price - a.price;
      });
    }
    if (sort === "name-a") {
      tempProducts = filteredProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      tempProducts = filteredProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }

    return { ...state, filteredProducts: tempProducts };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { searchTag, category, company, color, price, shipping } =
      state.filters;

    const { allProducts } = state;

    let tempProducts = allProducts;

    if (searchTag) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.startsWith(searchTag);
      });
    }
    if (category !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.category === category;
      });
    }
    if (company !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.company === company;
      });
    }
    if (color !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.includes(color);
      });
    }

    tempProducts = tempProducts.filter((product) => {
      return product.price / 100 <= price;
    });

    if (shipping) {
      tempProducts = tempProducts.filter((product) => {
        return product.shipping === shipping;
      });
    }

    return { ...state, filteredProducts: tempProducts };
  }
  if (action.type === UPDATE_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.payload.name]: action.payload.value,
      },
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        price: state.filters.maxPrice,
        category: "all",
        company: "all",
        color: "all",
        shipping: true,
        searchTag: "",
      },
    };
  }
};

export default filter_reducer;
