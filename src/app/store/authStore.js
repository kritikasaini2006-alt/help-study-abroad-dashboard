
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      hasHydrated: false,

      setHasHydrated: (value) => {
        set({ hasHydrated: value });
      },
      setAuth: (user, token) => {
  set({
    user,
    token,
    loading: false,
    error: null,
  });
},

      login: async (username, password) => {
        set({ loading: true, error: null });

        try {
          const response = await fetch(
            "https://dummyjson.com/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username,
                password,
                expiresInMins: 30,
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Login failed");
          }

          set({
            user: data,
            token: data.accessToken || data.token,
            loading: false,
            error: null,
          });

          return true;
        } catch (error) {
          set({
            loading: false,
            error: error.message || "Something went wrong",
          });

          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          loading: false,
          error: null,
        });
      },
    }),
    {
      name: "help-study-auth",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
