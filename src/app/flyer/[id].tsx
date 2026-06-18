import React from 'react';
import { View, Text, Image, ScrollView, Pressable, Share, Platform, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MoreHorizontal, Eye, Share2, Bookmark, Calendar, Compass, Phone, ChevronRight } from 'lucide-react-native';
import { useFlyers } from '../../context/FlyersContext';

export default function FlyerDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { flyers, toggleFollowStore, toggleSaveFlyer, isStoreFollowed, isFlyerSaved } = useFlyers();

  const flyer = flyers.find((f) => f.id === id);

  if (!flyer) {
    return (
      <SafeAreaView className="flex-1 bg-surface items-center justify-center">
        <Text className="text-on-surface text-base">Flyer not found.</Text>
        <Pressable onPress={() => router.back()} className="mt-4 bg-primary px-4 py-2 rounded-xl">
          <Text className="text-white font-bold">Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const isFollowed = isStoreFollowed(flyer.storeName);
  const isSaved = isFlyerSaved(flyer.id);

  const handleShare = async () => {
    try {
      const message = `Check out this flyer! "${flyer.title}" from ${flyer.storeName} valid until ${flyer.validUntil}. Location: ${flyer.location}.`;
      await Share.share({
        title: flyer.title,
        message,
        url: Platform.OS === 'ios' ? flyer.image : undefined,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleGetDirections = () => {
    const query = encodeURIComponent(`${flyer.storeName}, ${flyer.location}`);
    const url = Platform.select({
      ios: `maps://0,0?q=${query}`,
      android: `geo:0,0?q=${query}`,
      default: `https://www.google.com/maps/search/?api=1&query=${query}`,
    });

    Linking.openURL(url).catch(() => {
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
    });
  };

  const handleCall = () => {
    Linking.openURL('tel:18005550199').catch(() => {
      alert('Phone calls are not supported on this device.');
    });
  };

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
        <Text className="text-lg font-bold text-on-surface">Flyer Details</Text>
        <Pressable className="w-10 h-10 flex items-center justify-center rounded-full active:bg-surface-container-low">
          <MoreHorizontal size={20} color="#1b1c1c" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 110 }} className="flex-1">
        {/* Store Header */}
        <View className="px-5 py-4 flex-col gap-4 bg-white">
          <View className="flex-row items-center gap-3">
            {/* Custom stylized square avatar box matching the design */}
            <View className="w-14 h-14 rounded-xl bg-[#6B8E23] items-center justify-center flex-col p-1">
              <Text className="text-white text-[9px] font-black uppercase text-center leading-none">
                {flyer.storeName.split(' ')[0]}
              </Text>
              <Text className="text-white text-[7px] font-normal uppercase text-center mt-0.5 leading-none">
                SUPERMARKET
              </Text>
            </View>
            <View className="flex-1 ml-1 flex-col">
              <Text className="text-base font-bold text-on-surface leading-tight">
                {flyer.storeName}
              </Text>
              <Text className="text-sm text-on-surface-variant mt-0.5">
                {flyer.distance} • Open until 9 PM
              </Text>
            </View>
          </View>

          {/* Follow Button */}
          <Pressable
            onPress={() => toggleFollowStore(flyer.storeName)}
            className="w-full bg-[#e6c15d] py-3.5 rounded-xl items-center justify-center active:scale-98"
          >
            <Text className="text-on-primary font-bold text-sm">
              {isFollowed ? 'Following' : 'Follow'}
            </Text>
          </Pressable>
        </View>

        {/* Flyer Visual/Carousel */}
        <View className="relative w-full aspect-[3/4] bg-[#7a9b8e] items-center justify-center overflow-hidden">
          <Image
            source={{ uri: flyer.image }}
            className="w-[75%] h-[85%] bg-white shadow-2xl"
            resizeMode="contain"
          />
          {/* Pagination Tag Overlay */}
          <View className="absolute top-4 right-4 bg-black/50 px-3 py-1.5 rounded-full">
            <Text className="text-white text-xs font-bold">1 / 5</Text>
          </View>
          {/* Pagination Dots */}
          <View className="absolute bottom-4 flex-row justify-center gap-2">
            <View className="w-2 h-2 rounded-full bg-[#e6c15d]" />
            <View className="w-2 h-2 rounded-full bg-white/50" />
            <View className="w-2 h-2 rounded-full bg-white/50" />
            <View className="w-2 h-2 rounded-full bg-white/50" />
            <View className="w-2 h-2 rounded-full bg-white/50" />
          </View>
        </View>

        {/* Stats & Actions Row */}
        <View className="px-5 py-4 flex-row items-center justify-between border-b border-surface-container bg-white">
          <View className="flex-row items-center gap-2 text-on-surface-variant">
            <Eye size={16} color="#4a473e" />
            <Text className="text-sm font-semibold text-on-surface ml-1">
              {flyer.views} views
            </Text>
          </View>
          
          <View className="flex-row items-center gap-4">
            <Pressable onPress={handleShare} className="items-center flex-col gap-1">
              <View className="w-10 h-10 rounded-full bg-surface-container items-center justify-center active:bg-surface-container-high">
                <Share2 size={16} color="#1b1b1a" />
              </View>
              <Text className="text-[10px] font-semibold text-on-surface">Share</Text>
            </Pressable>
            
            <Pressable onPress={() => toggleSaveFlyer(flyer.id)} className="items-center flex-col gap-1">
              <View className="w-10 h-10 rounded-full bg-surface-container items-center justify-center active:bg-surface-container-high">
                <Bookmark
                  size={16}
                  color={isSaved ? '#e6c15d' : '#1b1b1a'}
                  fill={isSaved ? '#e6c15d' : 'transparent'}
                />
              </View>
              <Text className="text-[10px] font-semibold text-on-surface">Save</Text>
            </Pressable>
          </View>
        </View>

        {/* Content Details */}
        <View className="px-5 py-5 flex-col gap-4 bg-white">
          <Text className="text-xl font-bold text-on-surface">
            {flyer.title}
          </Text>
          <Text className="text-sm text-on-surface-variant leading-relaxed">
            {flyer.description}
          </Text>
          
          {/* Validity Badge */}
          <View className="bg-[#fdf5dd] px-3 py-1.5 rounded-lg flex-row items-center w-fit">
            <Calendar size={13} color="#8c6d1f" />
            <Text className="text-[#8c6d1f] text-xs font-semibold ml-1.5">
              Valid: {flyer.validUntil}
            </Text>
          </View>
        </View>

        {/* Info List */}
        <View className="px-5 pb-6 flex-col gap-4 bg-white border-t border-surface-container pt-5">
          <View className="flex-row justify-between items-center py-1">
            <Text className="text-sm text-outline font-medium">Offer Type</Text>
            <Text className="text-sm text-on-surface font-semibold">In-store & Pickup</Text>
          </View>
          <View className="flex-row justify-between items-center py-1">
            <Text className="text-sm text-outline font-medium">Location</Text>
            <Text className="text-sm text-on-surface font-semibold truncate max-w-[200px]">
              {flyer.location.split(',')[0]}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View className="absolute  bottom-0  left-0 right-0 bg-white border-t border-surface-container py-3 px-4 p-6  flex-row items-center gap-3 z-20 pb-safe shadow-lg">
        <Pressable
          onPress={handleGetDirections}
          className="flex-1 h-full bg-[#e6c15d] py-3.5 rounded-xl flex-row items-center justify-center gap-2 active:scale-[0.98]"
        >
          <Compass size={18} color="#3f2e00" />
          <Text className="text-on-primary font-bold text-sm">
            Get Directions
          </Text>
        </Pressable>

        <Pressable
          onPress={handleCall}
          className="w-14 h-14 bg-surface-container rounded-xl items-center justify-center active:bg-surface-container-high flex-shrink-0"
        >
          <Phone size={18} color="#1b1b1a" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
