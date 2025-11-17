import { useState } from 'react';
import { useAuth } from '@/src/provider/auth-context';
import type { LoginCredentials } from '@/src/types/auth';

export function useLoginForm() {
  const { onLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (value: string) => {
    if (error) {
      setError(null);
    }
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    if (error) {
      setError(null);
    }
    setPassword(value);
  };

  const isFormFilled = email.trim().length > 0 && password.trim().length > 0;

  async function handleLogin() {
    if (!isFormFilled) return;

    try {
      setIsLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const credentials: LoginCredentials = { email, password };
      await onLogin?.(credentials);
    } catch (err: any) {
      const message = 'Falha ao fazer login. Verifique suas credenciais.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    email,
    password,
    isLoading,
    error,
    isFormFilled,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  };
}

