import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, useWindowDimensions, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Bell, Compass, Bookmark } from 'lucide-react-native';
import { useFlyers } from '../../context/FlyersContext';
import { Card } from '../../components/Card';
import { SearchBar } from '../../components/SearchBar';


export default function HomeScreen() {
  const router = useRouter();
  const { flyers } = useFlyers();
  const { width } = useWindowDimensions();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  // Debounce search query updates to avoid recalculating filtered list on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const isTablet = width > 768;
  const numColumns = isTablet ? 3 : 2;

  // Filter flyers based on category and debounced search query
  const filteredFlyers = flyers.filter((flyer) => {
    const matchesCategory = selectedCategory === 'All' || flyer.category === selectedCategory;
    const matchesSearch =
      flyer.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      flyer.storeName.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Stable renderItem callback
  const renderItem = useCallback(({ item }: { item: any }) => (
    <Card
      flyer={item}
      onPress={() => router.push(`/flyer/${item.id}` as any)}
    />
  ), [router]);

  const categories = [
    { name: 'All', emoji: '' },
    { name: 'Grocery', emoji: '🛒' },
    { name: 'Fashion', emoji: '👗' },
    { name: 'Services', emoji: '🔧' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="pt-6 pb-4 px-4 flex-col space-y-4">
        {/* Header Top Row */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-3">
            {/* Logo */}
            <View className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <View >
              <Compass size={18} color="#E8C967" />
              
              </View>
            </View>
            <View className="flex-col">
              <Text className="text-base font-black text-[#2D2D2D] tracking-tight">
                FlyersFriday
              </Text>
              <Text className="text-[10px] text-gray-500 font-semibold mt-0.5">
                Brooklyn, NY
              </Text>
            </View>
          </View>
          
          {/* Notification Button */}
          <Pressable className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center border border-gray-100 active:bg-gray-100">
            <Bell size={18} color="#000000" fill='#000000' />
          </Pressable>
        </View>

        {/* Search & Filter Row using reusable SearchBar component */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={() => {}}
        />
      </View>

      {/* Categories Horizontal Scroll */}
      <View className="pb-3">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.name}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => {
            const isActive = selectedCategory === item.name;
            return (
              <Pressable
                onPress={() => setSelectedCategory(item.name)}
                className={`px-5 py-2.5 mr-2.5 rounded-xl border flex-row items-center transition-all ${
                  isActive
                    ? 'bg-[#e6c15d] border-[#e6c15d] shadow-md shadow-[#e6c15d]/20'
                    : 'bg-white border-gray-100 shadow-sm active:bg-gray-50'
                }`}
              >
                {item.emoji ? (
                  <Text className="text-xs mr-1">{item.emoji}</Text>
                ) : null}
                <Text
                  className={`text-xs font-bold ${
                    isActive ? 'text-[#3f2e00] font-extrabold' : 'text-on-surface-variant font-semibold'
                  }`}
                >
                  {item.name}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      {/* Main Grid Feed */}
      <FlatList
        data={filteredFlyers}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 40, // standard padding since tab bar handles bottom
        }}
        columnWrapperStyle={numColumns > 1 ? { justifyContent: 'space-between' } : undefined}
        
        ListHeaderComponent={
          selectedCategory === 'All' && searchQuery === '' ? (
            <View className="mb-6">
              {/* Featured Promo */}
              <View className="relative bg-[#e6c15d] p-6 flex-col justify-center rounded-3xl py-8 overflow-hidden">
                <View className="absolute -right-6 -top-6 opacity-10">
                  <Text className="text-black text-9xl">🔥</Text>
                </View>
                
                <View className="relative z-10 flex-col items-start">
                  <View className="bg-black px-3 py-1 rounded-full mb-2">
                    <Text className="text-[#e6c15d] text-[9px] font-bold uppercase tracking-wider">
                      FEATURED
                    </Text>
                  </View>
                  <Text className="text-2xl font-black text-[#3f2e00] leading-tight">
                    Weekend Mega Sale
                  </Text>
                  <Text className="text-xs text-[#584400] font-semibold mt-1">
                    Up to 70% off at local retailers
                  </Text>
                </View>
              </View>

              {/* Grid Title */}
              <Text className="text-xl font-extrabold text-on-surface mt-8 mb-4">
                Trending Near You
              </Text>
            </View>
          ) : (
            <Text className="text-xl font-extrabold text-on-surface mb-4">
              {selectedCategory} Flyers
            </Text>
          )
        }
        
        renderItem={renderItem}
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={Platform.OS === 'android'}
        
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20 px-8">
            <Text className="text-on-surface-variant text-sm font-bold text-center">
              No matching flyers found
            </Text>
            <Text className="text-on-surface-variant text-xs text-center mt-1">
              Check your spelling or filter a different category.
            </Text>
          </View>
        }
      />

      {/* Floating Action Button (FAB) styled in yellow theme, routing to Bookmarks */}
      <View className="absolute bottom-6 right-6 z-50">
        <Pressable
          onPress={() => router.push('/bookmarks' as any)}
          style={({ pressed }) => [
            {
              transform: pressed ? [{ scale: 0.92 }] : [{ scale: 1 }],
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 5,
            },
          ]}
          className="bg-[#e6c15d] w-14 h-14 rounded-full items-center justify-center border border-white/20 active:bg-yellow-400"
        >
          <Bookmark size={22} color="#1b1c1c" fill="#1b1c1c" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
