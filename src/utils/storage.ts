import * as SecureStore from 'expo-secure-store';

/**
 * Utilitários para gerenciar armazenamento seguro
 */

const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_ID: 'user_id',
} as const;

/**
 * Salva o token de autenticação
 */
export async function saveToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(STORAGE_KEYS.TOKEN, token);
}

/**
 * Obtém o token de autenticação
 */
export async function getToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(STORAGE_KEYS.TOKEN);
}

/**
 * Remove o token de autenticação
 */
export async function removeToken(): Promise<void> {
  await SecureStore.deleteItemAsync(STORAGE_KEYS.TOKEN);
}

/**
 * Salva o ID do usuário
 */
export async function saveUserId(userId: number): Promise<void> {
  await SecureStore.setItemAsync(STORAGE_KEYS.USER_ID, String(userId));
}

/**
 * Obtém o ID do usuário
 */
export async function getUserId(): Promise<number | null> {
  const id = await SecureStore.getItemAsync(STORAGE_KEYS.USER_ID);
  return id ? Number(id) : null;
}

/**
 * Remove o ID do usuário
 */
export async function removeUserId(): Promise<void> {
  await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_ID);
}

/**
 * Salva credenciais de autenticação (token + userId)
 */
export async function saveAuthCredentials(token: string, userId: number): Promise<void> {
  await Promise.all([
    saveToken(token),
    saveUserId(userId),
  ]);
}

/**
 * Obtém credenciais de autenticação
 */
export async function getAuthCredentials(): Promise<{ token: string | null; userId: number | null }> {
  const [token, userId] = await Promise.all([
    getToken(),
    getUserId(),
  ]);

  return { token, userId };
}

/**
 * Remove todas as credenciais de autenticação
 */
export async function clearAuthCredentials(): Promise<void> {
  await Promise.all([
    removeToken(),
    removeUserId(),
  ]);
}

