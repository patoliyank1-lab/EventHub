"use client";
import { AUTH } from "@/api-url";
import { ResponseType, StoreUser } from "@/Types";
import { createContext, useCallback, useEffect, useState } from "react";

const defaultValue: {
  user: StoreUser | null;
  isLogin: boolean;
  isLoading: boolean;
  isError: boolean | null;
  massage: string | null;
  login: ({ email, password }: { email: string; password: string }) => void;
  logout: () => void;
  register: ({
    name,
    age,
    gender,
    email,
    password,
    avatar,
  }: {
    name: string;
    age: string;
    gender: string;
    email: string;
    password: string;
    avatar: string;
  }) => void;
} = {
  user: null,
  isLoading: false,
  isLogin: true,
  isError: null,
  massage: null,
  login: () => {},
  logout: () => {},
  register: () => {},
};

export const AuthContext = createContext(defaultValue);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<StoreUser | null>(null);
  const [isError, setIsError] = useState<boolean | null>(null);
  const [massage, setMassage] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch(AUTH.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result: ResponseType = await response.json();

      if (result.success) {
        setIsLoading(false);
        setIsError(false);
        setIsLogin(true);
        setUser(result.data as StoreUser);
      } else {
        setIsLoading(false);
        setIsError(true);
        setMassage(result.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    setUser(null);
    setIsLoading(false);
    setIsLogin(false);
  };

  const register = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch(AUTH.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      const result: ResponseType = await response.json();
      if (result.success) {
        setIsLoading(false);
        setIsError(false);
        setIsLogin(true);
        setUser(result.data as StoreUser);
      } else {
        setIsLoading(false);
        setIsError(true);
        setMassage(result.message || "register failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        login,
        logout,
        register,
        isError,
        massage,
        isLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
