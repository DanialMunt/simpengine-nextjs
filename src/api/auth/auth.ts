import { api } from "@/lib/axios";
import { LoginDto, RegisterDto, AuthResponse } from "@/types/auth";

export const loginApi = async (data: LoginDto): Promise<AuthResponse> => {
  const res = await api.post("/user/login", data);
  return res.data;
};

export const registerApi = async (data: RegisterDto): Promise<AuthResponse> => {
  const res = await api.post("/user/register", data);
  return res.data;
};

export const logoutApi = async (): Promise<void> => {
  await api.post("/user/logout");
};
