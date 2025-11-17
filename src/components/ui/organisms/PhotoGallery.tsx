import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, Text, View } from 'react-native';
import { PhotoCard } from '../molecules/PhotoCard';
import { EmptyState } from '../molecules/EmptyState';
import { Avatar } from '../atoms/Avatar';
import { GradientConfigs } from '@/src/constants/gradients';
import type { Photo, ReceiptPhoto } from '@/src/types/photo';

interface PhotoGalleryProps {
  title: string;
  description: string;
  photos: (Photo | ReceiptPhoto)[];
  status: 'pending' | 'uploaded';
  onPhotoRemove?: (uri: string) => void;
  emptyIcon?: string;
  emptyTitle: string;
  emptyDescription: string;
  icon?: string;
  badgeCount?: number;
}

export function PhotoGallery({
  title,
  description,
  photos,
  status,
  onPhotoRemove,
  emptyIcon = 'image',
  emptyTitle,
  emptyDescription,
  icon = 'check-square-o',
  badgeCount,
}: PhotoGalleryProps) {
  const gradientConfig = status === 'uploaded' 
    ? GradientConfigs.iconEmerald 
    : GradientConfigs.iconAmber;

  const badgeColor = status === 'uploaded'
    ? 'bg-emerald-500/20 border-emerald-500/50'
    : 'bg-amber-500/20 border-amber-500/50';

  const badgeTextColor = status === 'uploaded' ? 'text-emerald-400' : 'text-amber-400';

  return (
    <View className="mt-8 px-6">
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-row items-center flex-1">
          <Avatar
            icon={icon as any}
            size="medium"
            gradientConfig={gradientConfig}
            style={{ marginRight: 16 }}
          />
          <View className="flex-1">
            <Text className="text-white font-black text-xl">
              {title}
            </Text>
            <Text className="text-slate-400 text-sm mt-1">
              {description}
            </Text>
          </View>
        </View>
        {badgeCount !== undefined && (
          <View className={`rounded-full px-4 py-2 border ${badgeColor}`}>
            <Text className={`${badgeTextColor} font-black text-lg`}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4 py-4"
      >
        {photos.length === 0 ? (
          <View className="bg-slate-900/50 rounded-3xl p-12 border-2 border-dashed border-slate-700/50 items-center justify-center w-80 mr-4">
            <View className="bg-slate-800 rounded-full p-6 mb-4">
              <Avatar icon={emptyIcon as any} size="small" />
            </View>
            <Text className="text-slate-500 text-center font-bold text-base">
              {emptyTitle}
            </Text>
            <Text className="text-slate-600 text-center text-sm mt-2">
              {emptyDescription}
            </Text>
          </View>
        ) : (
          photos.map((photo, idx) => {
            const uri = 'uri' in photo ? photo.uri : photo.imageUrl;
            return (
              <PhotoCard
                key={idx}
                uri={uri}
                onActionPress={onPhotoRemove ? () => onPhotoRemove(uri) : undefined}
                status={status}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

