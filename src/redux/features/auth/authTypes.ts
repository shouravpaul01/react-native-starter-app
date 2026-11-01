export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  photo?: string;
  phone?: string;
  [key: string]: unknown;
}

export interface DecodedToken {
  id?: string;
  sub?: string;
  name?: string;
  email?: string;
  role?: string;
  photo?: string;
  phone?: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

export interface AuthState {
  token: string | null;
  refresh_token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
