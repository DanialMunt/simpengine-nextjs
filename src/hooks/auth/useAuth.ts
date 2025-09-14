import { useMutation } from "@tanstack/react-query";
import { loginApi, registerApi, logoutApi } from "@/api/auth/auth";
import { LoginDto, RegisterDto, AuthResponse } from "@/types/auth";

export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginDto>({
    mutationFn: loginApi,
  });
};

export const useRegister = () => {
  return useMutation<AuthResponse, Error, RegisterDto>({
    mutationFn: registerApi,
  });
};

export const useLogout = () => {
  return useMutation<void, Error>({
    mutationFn: logoutApi,
  });
};
