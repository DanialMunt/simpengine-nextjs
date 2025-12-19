"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi, registerApi, logoutApi } from "@/api/auth/authApi";
import useAuthStore from "@/stores/useAuthStore";
import type { LoginDto, RegisterDto, AuthResponse } from "@/types/auth";
import { toast } from "sonner";
const userKey = ["user"];

export const useLogin = (options?: {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (err: unknown) => void;
}) => {
  const qc = useQueryClient();

  return useMutation<AuthResponse, Error, LoginDto>({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if (data.token) {
        useAuthStore.getState().setToken(data.token);
        console.log("Token: ", data.token)
      }
      if (data.user) {
        useAuthStore.getState().setUser(data.user);
        
        qc.setQueryData(userKey, data.user);
      }

      options?.onSuccess?.(data);
    },
    onError: (err) => {
      options?.onError?.(err);
    },
  });
};

export const useRegister = (options?: {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (err: unknown) => void;
}) => {
  const qc = useQueryClient();

  return useMutation<AuthResponse, Error, RegisterDto>({
    mutationFn: registerApi,
    onSuccess: (data) => {
      if (data.token) {
        useAuthStore.getState().setToken(data.token);
      }
      if (data.user) {
        useAuthStore.getState().setUser(data.user);
        qc.setQueryData(userKey, data.user);
      }

      options?.onSuccess?.(data);
    },
    onError: (err) => {
      options?.onError?.(err);
    },
  });
};

export const useLogout = (options?: {
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
}) => {
  const qc = useQueryClient();

  return useMutation<void, Error>({
    mutationFn: logoutApi,
    onSuccess: () => {
      useAuthStore.getState().clearAuth();
      qc.removeQueries({ queryKey: userKey });

      options?.onSuccess?.();

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    },
    onError: (err) => {
      useAuthStore.getState().clearAuth();
      qc.removeQueries({ queryKey: userKey });

      options?.onError?.(err);
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    },
  });
};
