import deliveriesService from '@/src/services/deliveries/deliveries_service';
import type { Delivery, DeliveryFilters } from '@/src/types/delivery';
import { DeliveryStatus } from '@/src/types/delivery';
import { useCallback, useEffect, useState } from 'react';

export function useDeliveries(userId?: number | null) {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [filters, setFilters] = useState<DeliveryFilters>({ search: '', status: '' });
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [filters.search]);

  // Memoizar fetchDeliveries com useCallback para evitar loop infinito
  const fetchDeliveries = useCallback(async () => {
    // Não fazer fetch se userId não existir
    if (!userId) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const data = await deliveriesService.getDeliveries(
        filters.status,
        debouncedSearch,
        userId as number
      );
      setDeliveries(data);
    } catch (err) {
      setError('Erro ao carregar entregas');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [filters.status, debouncedSearch, userId]);

  // Fetch deliveries quando filtros mudam
  useEffect(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

  function handleStatusFilter(status: DeliveryStatus | '') {
    setFilters((prev) => ({ ...prev, status }));
  }

  function handleSearchFilter(search: string) {
    setFilters((prev) => ({ ...prev, search }));
  }

  // Memoizar refreshDeliveries para evitar loop no useFocusEffect
  const refreshDeliveries = useCallback(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

  return {
    deliveries,
    filters,
    isLoading,
    error,
    handleStatusFilter,
    handleSearchFilter,
    refreshDeliveries,
  };
}

