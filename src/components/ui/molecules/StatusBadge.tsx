import { Badge } from '../atoms/Badge';
import { getStatusColor, translateStatus } from '@/src/utils/statusUtils';
import { DeliveryStatus } from '@/src/types/delivery';

interface StatusBadgeProps {
  status: DeliveryStatus | string;
  size?: 'small' | 'medium' | 'large';
}

export function StatusBadge({ status, size = 'medium' }: StatusBadgeProps) {
  const statusColors = getStatusColor(status);
  const translatedStatus = translateStatus(status as DeliveryStatus);

  return (
    <Badge
      text={translatedStatus}
      backgroundColor={statusColors.bg}
      textColor={statusColors.text}
      borderColor={statusColors.border}
      size={size}
    />
  );
}

