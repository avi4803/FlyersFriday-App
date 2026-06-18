import React from 'react';
import { View, Text, FlatList, useWindowDimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bookmark } from 'lucide-react-native';
import { useFlyers } from '../context/FlyersContext';
import { Card } from '../components/Card';

export default function BookmarksScreen() {
  const router = useRouter();
  const { flyers } = useFlyers();
  const { width } = useWindowDimensions();

  const isTablet = width > 768;
  const numColumns = isTablet ? 3 : 2;

  // Filter for only bookmarked (saved) flyers
  const savedFlyers = flyers.filter((f) => f.saved);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      {/* Top App Bar */}
      <View className="px-4 py-4 flex-row items-center justify-between border-b border-surface-container bg-white">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full active:bg-surface-container-low"
        >
          <ArrowLeft size={20} color="#1b1c1c" />
        </Pressable>
        <Text className="text-lg font-bold text-on-surface">Bookmarked Flyers</Text>
        <View className="w-10 h-10 items-center justify-center">
          <Bookmark size={20} color="#e6c15d" fill="#e6c15d" />
        </View>
      </View>

      {/* Bookmarked Grid Feed */}
      <FlatList
        data={savedFlyers}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 40,
        }}
        columnWrapperStyle={numColumns > 1 ? { justifyContent: 'space-between' } : undefined}
        renderItem={({ item }) => (
          <Card
            flyer={item}
            onPress={() => router.push(`/flyer/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-32 px-8">
            <View className="w-16 h-16 rounded-full bg-gray-50 items-center justify-center mb-4">
              <Bookmark size={28} color="#94A3B8" />
            </View>
            <Text className="text-on-surface-variant text-sm font-bold text-center">
              No bookmarked flyers
            </Text>
            <Text className="text-on-surface-variant text-xs text-center mt-1 max-w-[220px]">
              Tap the bookmark icon at the top right of any flyer card to save it here.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
