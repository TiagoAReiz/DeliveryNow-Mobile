/**
 * Tipos relacionados à autenticação
 */

export interface AuthState {
  token: string | null;
  authenticated: boolean | null;
  userId: number | null;
}

export interface AuthContextType {
  authState?: AuthState;
  onLogin?: (data: LoginCredentials) => Promise<any>;
  onLogout?: () => Promise<void>;
  userId?: number | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  id: number;
  email: string;
  name?: string;
}

