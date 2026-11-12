
import { create } from "zustand";
import { fetchWithCache } from "../utils/apiCache";

export const useApiStore = create((set) => ({
  // Users state
  users: [],
  usersTotal: 0,
  usersLoading: false,
  usersError: null,

  // Products state
  products: [],
  productsTotal: 0,
  productsLoading: false,
  productsError: null,

  // Product categories
  categories: [],
  categoriesLoading: false,
  categoriesError: null,

  // Fetch users through Zustand
  fetchUsers: async (url) => {
    set({ usersLoading: true, usersError: null });

    try {
      const data = await fetchWithCache(url);

      set({
        users: data.users,
        usersTotal: data.total,
        usersLoading: false,
      });
    } catch (error) {
      set({
        usersError: error.message,
        usersLoading: false,
      });
    }
  },

  // Fetch products through Zustand
  fetchProducts: async (url) => {
    set({ productsLoading: true, productsError: null });

    try {
      const data = await fetchWithCache(url);

      set({
        products: data.products,
        productsTotal: data.total,
        productsLoading: false,
      });
    } catch (error) {
      set({
        productsError: error.message,
        productsLoading: false,
      });
    }
  },

  // Fetch categories through Zustand
  
fetchCategories: async () => {
  set({ categoriesLoading: true, categoriesError: null });

  try {
    const data = await fetchWithCache(
      "https://dummyjson.com/products/categories"
    );

    // Support both string and object category responses.
    const categories = data.map((item) =>
      typeof item === "string" ? item : item.slug
    );

    set({
      categories,
      categoriesLoading: false,
      categoriesError: null,
    });
  } catch (error) {
    set({
      categoriesError: error.message,
      categoriesLoading: false,
    });
  }
},
}));