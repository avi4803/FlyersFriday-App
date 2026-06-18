import React from 'react';
import { View, Text, Image, Pressable, useWindowDimensions } from 'react-native';
import { MapPin, Heart , Bookmark } from 'lucide-react-native';
import { Flyer } from '../constants/mockData';
import { useFlyers } from '../context/FlyersContext';

interface CardProps {
  flyer: Flyer;
  onPress: () => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ flyer, onPress, className = '' }) => {
  const { toggleSaveFlyer, isFlyerSaved } = useFlyers();
  const { width } = useWindowDimensions();
  
  const saved = isFlyerSaved(flyer.id);
  const isTablet = width > 768;

  let badgeBg = 'bg-slate-800';
  let badgeTextCol = 'text-white';
  if (flyer.badgeColor === 'red') {
    badgeBg = 'bg-[#D64F56]';
  } else if (flyer.badgeColor === 'yellow') {
    badgeBg = 'bg-[#e6c15d]';
    badgeTextCol = 'text-[#3f2e00]';
  } else if (flyer.badgeColor === 'green') {
    badgeBg = 'bg-green-600';
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }] }]}
      className={`flex-col mb-6 ${isTablet ? 'w-[31%]' : 'w-[48%]'} ${className}`}
    >
      {/* Card Visual Wrapper */}
      <View className="relative bg-white aspect-[4/5] shadow-sm border border-gray-100 rounded-2xl items-center justify-center overflow-hidden">
        <Image
          source={{ uri: flyer.image }}
          className="w-full h-full rounded-xl"
          resizeMode={flyer.storeName.includes('Whole Foods') || flyer.storeName.includes('Target') ? 'contain' : 'cover'}
        />

        {/* Badge tag */}
        {flyer.badgeText ? (
          <View className={`absolute left-3.5 bottom-3.5 ${badgeBg} px-2.5 py-0.5 rounded-md shadow-sm`}>
            <Text className={`${badgeTextCol} text-[9px] font-black tracking-wider`}>
              {flyer.badgeText}
            </Text>
          </View>
        ) : null}

        {/* Save Toggle */}
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            toggleSaveFlyer(flyer.id);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full items-center justify-center shadow-sm active:scale-90"
        >
          <Bookmark
            size={16}
            color={saved ? '#1a1a19ff' : '#2D2D2D'}
            fill={saved ? '#1a1a19ff' : 'transparent'}
          />
        </Pressable>
      </View>

      {/* Card Info Details */}
      <View className="mt-2.5 px-1 flex-col">
        <Text className="text-sm font-bold text-on-surface truncate leading-tight">
          {flyer.storeName}
        </Text>
        
        <View className="flex-row items-center mt-1">
          <MapPin size={11} color="#7f7665" />
          <Text className="text-[10px] text-on-surface-variant font-semibold ml-1">
            {flyer.distance}
          </Text>
        </View>

        {/* Special Services badge */}
        {flyer.storeName.includes('Speedy') && (
          <Text className="text-[9px] font-black text-green-600 mt-1 uppercase">
            50% OFF SERVICE
          </Text>
        )}
      </View>
    </Pressable>
  );
};
