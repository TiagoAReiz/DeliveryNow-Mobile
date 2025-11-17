/**
 * Validações de formulário
 */

/**
 * Valida formato de email
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email || email.trim().length === 0) {
    return { isValid: false, error: 'Email é obrigatório' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Email inválido' };
  }

  return { isValid: true };
}

/**
 * Valida senha
 */
export function validatePassword(password: string): { isValid: boolean; error?: string } {
  if (!password || password.trim().length === 0) {
    return { isValid: false, error: 'Senha é obrigatória' };
  }

  if (password.length < 6) {
    return { isValid: false, error: 'Senha deve ter no mínimo 6 caracteres' };
  }

  return { isValid: true };
}

/**
 * Valida se um campo não está vazio
 */
export function validateRequired(value: string, fieldName: string = 'Campo'): { isValid: boolean; error?: string } {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: `${fieldName} é obrigatório` };
  }

  return { isValid: true };
}

/**
 * Valida formulário de login completo
 */
export function validateLoginForm(email: string, password: string): {
  isValid: boolean;
  errors: {
    email?: string;
    password?: string;
  };
} {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);

  return {
    isValid: emailValidation.isValid && passwordValidation.isValid,
    errors: {
      email: emailValidation.error,
      password: passwordValidation.error,
    },
  };
}

/**
 * Valida se um campo está preenchido (check para habilitar botões)
 */
export function isFormFilled(...fields: string[]): boolean {
  return fields.every(field => field && field.trim().length > 0);
}

