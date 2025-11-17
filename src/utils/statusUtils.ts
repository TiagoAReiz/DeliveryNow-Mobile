import { DeliveryStatus } from '@/src/types/delivery';
import type { StatusColorScheme, StatusInfo } from '@/src/types/delivery';
import { Shadows } from '@/src/constants/shadows';
import type { FontAwesome } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

type FontAwesomeIconName = ComponentProps<typeof FontAwesome>['name'];

/**
 * Traduz o status de delivery para português
 */
export function translateStatus(status: DeliveryStatus | string): string {
  switch (status) {
    case DeliveryStatus.DELIVERED:
      return 'Entregue';
    case DeliveryStatus.PENDING:
      return 'Pendente';
    case DeliveryStatus.LATE:
      return 'Atrasado';
    default:
      return status;
  }
}

/**
 * Retorna o esquema de cores para um determinado status
 */
export function getStatusColor(status: DeliveryStatus | string): StatusColorScheme {
  switch (status) {
    case DeliveryStatus.PENDING:
      return {
        bg: 'rgba(245, 158, 11, 0.2)',
        text: '#fbbf24',
        border: 'rgba(245, 158, 11, 0.5)',
      };
    case DeliveryStatus.DELIVERED:
      return {
        bg: 'rgba(16, 185, 129, 0.2)',
        text: '#34d399',
        border: 'rgba(16, 185, 129, 0.5)',
      };
    case DeliveryStatus.LATE:
      return {
        bg: 'rgba(239, 68, 68, 0.2)',
        text: '#f87171',
        border: 'rgba(239, 68, 68, 0.5)',
      };
    default:
      return {
        bg: 'rgba(107, 114, 128, 0.2)',
        text: '#9ca3af',
        border: 'rgba(107, 114, 128, 0.5)',
      };
  }
}

/**
 * Retorna informações completas de estilo e conteúdo para um status
 */
export function getStatusInfo(status: DeliveryStatus | string): StatusInfo {
  switch (status) {
    case DeliveryStatus.PENDING:
      return {
        gradientColors: ['#fde047', '#f97316'],
        text: 'Pendente',
        icon: 'clock-o' as FontAwesomeIconName,
        shadowStyle: Shadows.shadowAmber,
      };
    case DeliveryStatus.DELIVERED:
      return {
        gradientColors: ['#34d399', '#10b981'],
        text: 'Entregue',
        icon: 'check-circle' as FontAwesomeIconName,
        shadowStyle: Shadows.shadowEmerald,
      };
    case DeliveryStatus.LATE:
      return {
        gradientColors: ['#fca5a5', '#ef4444'],
        text: 'Atrasado',
        icon: 'exclamation-triangle' as FontAwesomeIconName,
        shadowStyle: Shadows.shadowRose,
      };
    default:
      return {
        gradientColors: ['#9ca3af', '#6b7280'],
        text: status || '',
        icon: 'info-circle' as FontAwesomeIconName,
        shadowStyle: Shadows.shadowGray,
      };
  }
}

