import { useState, useEffect } from 'react';
import deliveriesService from '@/src/services/deliveries/deliveries_service';
import type { Delivery, DeliveryFilters } from '@/src/types/delivery';
import { DeliveryStatus } from '@/src/types/delivery';

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

  // Fetch deliveries quando filtros mudam
  useEffect(() => {
    fetchDeliveries();
  }, [filters.status, debouncedSearch, userId]);

  async function fetchDeliveries() {
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
  }

  function handleStatusFilter(status: DeliveryStatus | '') {
    setFilters((prev) => ({ ...prev, status }));
  }

  function handleSearchFilter(search: string) {
    setFilters((prev) => ({ ...prev, search }));
  }

  function refreshDeliveries() {
    fetchDeliveries();
  }

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

