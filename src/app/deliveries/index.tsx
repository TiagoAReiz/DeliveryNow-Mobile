import { useAuth } from '@/src/provider/auth-context';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';
import { GradientBackground } from '@/src/components/ui/atoms/GradientBackground';
import { SearchBar } from '@/src/components/ui/molecules/SearchBar';
import { FilterButton } from '@/src/components/ui/molecules/FilterButton';
import { DeliveryCard } from '@/src/components/ui/organisms/DeliveryCard';
import { EmptyState } from '@/src/components/ui/molecules/EmptyState';
import { useDeliveries } from '@/src/hooks/useDeliveries';
import { DeliveryStatus } from '@/src/types/delivery';

export default function DeliveriesPage() {
  const { onLogout, authState } = useAuth();
  const userId = authState?.userId;
  const router = useRouter();

  const {
    deliveries,
    filters,
    handleStatusFilter,
    handleSearchFilter,
    refreshDeliveries,
  } = useDeliveries(userId);

  useFocusEffect(() => {
    refreshDeliveries();
  });

  function navigateToDelivery(id: string) {
    router.push(`/deliveries/${id}` as any);
  }

  return (
    <View className="flex-1 bg-slate-950">
      {/* Background Geral */}
      <GradientBackground />

      {/* Header Compacto com Gradiente */}
      <View className="pt-14 pb-6 px-6 z-10">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-1">
              Bem-vindo de volta
            </Text>
            <Text className="text-3xl font-black text-white">Entregas</Text>
          </View>
          <Pressable
            onPress={onLogout}
            className="bg-slate-800/80 p-3 rounded-full border border-slate-700 active:bg-red-500/20 active:border-red-500/50"
          >
            <FontAwesome name="sign-out" size={20} color="#f87171" />
          </Pressable>
        </View>

        {/* Barra de Busca */}
        <View className="mb-6">
          <SearchBar
            onChangeText={handleSearchFilter}
            value={filters.search}
            placeholder="Buscar por nome ou endereço..."
          />
        </View>

        {/* Filtros Horizontais */}
        <View className="flex-row">
          <FilterButton
            title="Todos"
            active={filters.status === ''}
            onPress={() => handleStatusFilter('')}
          />
          <FilterButton
            title="Pendente"
            active={filters.status === DeliveryStatus.PENDING}
            onPress={() => handleStatusFilter(DeliveryStatus.PENDING)}
          />
          <FilterButton
            title="Entregue"
            active={filters.status === DeliveryStatus.DELIVERED}
            onPress={() => handleStatusFilter(DeliveryStatus.DELIVERED)}
          />
          <FilterButton
            title="Atrasado"
            active={filters.status === DeliveryStatus.LATE}
            onPress={() => handleStatusFilter(DeliveryStatus.LATE)}
          />
        </View>
      </View>

      {/* Lista de Entregas */}
      <FlatList
        data={deliveries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <DeliveryCard delivery={item} onPress={navigateToDelivery} />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="inbox"
            title="Nenhuma entrega encontrada"
            description="Tente ajustar seus filtros ou busca"
          />
        }
      />
    </View>
  );
}
