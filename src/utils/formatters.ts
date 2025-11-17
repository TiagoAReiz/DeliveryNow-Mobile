import type { Address } from '@/src/types/delivery';

/**
 * Formata um endereço completo
 */
export function formatAddress(address: Address | string): string {
  if (typeof address === 'string') {
    return address || 'Endereço não informado';
  }

  if (!address) {
    return 'Endereço não informado';
  }

  return `${address.street}, ${address.city}`;
}

/**
 * Formata um endereço completo com mais detalhes
 */
export function formatFullAddress(address: Address | string): {
  street: string;
  cityState: string;
  postalCode: string;
} | null {
  if (typeof address === 'string' || !address) {
    return null;
  }

  return {
    street: address.street,
    cityState: `${address.city}, ${address.state}`,
    postalCode: `${address.postalCode} (${address.country})`,
  };
}

/**
 * Formata o ID de uma delivery para exibição
 */
export function formatDeliveryId(id: string, length: number = 8): string {
  return String(id).substring(0, length).toUpperCase();
}

/**
 * Formata um número de telefone
 */
export function formatPhoneNumber(phone: string): string {
  // Remove caracteres não numéricos
  const cleaned = phone.replace(/\D/g, '');
  
  // Formata para (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  } else if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
}

/**
 * Formata uma data para o padrão brasileiro
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Formata data e hora para o padrão brasileiro
 */
export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

