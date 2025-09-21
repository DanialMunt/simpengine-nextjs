export interface LoginDto {
  login: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}


export interface AuthResponse {
  token: string; 
  user?: {
    id: string;
    login: string;
  };
}

