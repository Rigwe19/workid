import { create } from "zustand";
import { type AxiosResponse } from "axios";
import { get, post } from "../libs/axios";
import { persist, createJSONStorage } from "zustand/middleware";

type user = {
  workId: string;
  email: string;
  id: string;
  fullName: string;
  username: string;
  phone: string;
  location: string;
};

interface UseAuthStore {
  user: user | null;
  token: string | null;
  signIn: (form: { username: string; password: string }) => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  register: (details: any) => Promise<void>;
}
interface AuthResponse {
  code: number;
  error: boolean;
  message: string;
  data: {
    user: {
      workId: string;
      email: string;
      id: string;
      name: string;
      fullName: string;
      phone: string;
      location: string;
    };
    token: string;
  };
  errors?: [];
}
interface ValidationError {
  field: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const useAuth = create<UseAuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      signIn: async (form: {
        username: string;
        password: string;
      }): Promise<void> => {
        try {
          const response: AxiosResponse = await post(`/auth/login`, {
            username: form.username,
            password: form.password,
          });

          const userData = response.data;
          console.log(response.data);
          set({ token: response.data.token });
          console.log("SETUP", { user: response.data.user });
        } catch (error: unknown) {
          console.log(error);
          // Handle authentication errors
        }
      },
      fetchCurrentUser: async (): Promise<void> => {
        try {
          const response: AxiosResponse = await get(`/auth/user`);

          const userData = response.data;

          set({ user: response.data.user });
        } catch (error: unknown) {
          console.log(error);
          // Handle authentication errors
        }
      },
      register: async (details: any): Promise<void> => {
        try {
          const response: AxiosResponse = await post(
            `/auth/register`,
            details
          );

          // const userData = response.data.data;

          set({ token: response.data.token });
          // console.log("SETUP", { token: userData.token });
        } catch (error: any) {
          if (error.status === 422) {
            const validationErrors: FormErrors = {};
            error.validationErrors?.forEach((err: ValidationError) => {
              validationErrors[err.field] = err.message;
            });
            return Promise.reject(validationErrors);
            // console.log(validationErrors)
            // setErrors(validationErrors);
          }
          // Handle authentication errors
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuth;

// Export a way to get state directly
export const getAuthState = () => useAuth.getState();
