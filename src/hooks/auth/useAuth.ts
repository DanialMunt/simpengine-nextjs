"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi, registerApi, logoutApi } from "@/api/auth/auth";
import useAuthStore from "@/stores/useAuthStore";
import type { LoginDto, RegisterDto, AuthResponse } from "@/types/auth";

const userKey = ["user"];

export const useLogin = (options?: {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (err: unknown) => void;
}) => {
  const qc = useQueryClient();

  return useMutation<AuthResponse, Error, LoginDto>({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // ✅ store in zustand
      if (data.accessToken) {
        useAuthStore.getState().setAccessToken(data.accessToken);
      }
      if (data.user) {
        useAuthStore.getState().setUser(data.user);

        // ✅ also sync into tanstack cache
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
      if (data.accessToken) {
        useAuthStore.getState().setAccessToken(data.accessToken);
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
      // ✅ clear zustand + tanstack cache
      useAuthStore.getState().clearAuth();
      qc.removeQueries({ queryKey: userKey });

      options?.onSuccess?.();

      // optional: hard redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    },
    onError: (err) => {
      // even if logout API fails, clear local state
      useAuthStore.getState().clearAuth();
      qc.removeQueries({ queryKey: userKey });

      options?.onError?.(err);
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    },
  });
};
