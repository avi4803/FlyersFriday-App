import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFilterPress?: () => void;
  containerClassName?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search local flyers...',
  onFilterPress,
  containerClassName = '',
}) => {
  return (
    <View className={`flex-row items-center bg-white shadow-sm rounded-2xl border border-gray-100 px-3.5 py-1.5 ${containerClassName}`}>
      <Search size={18} color="#94A3B8" />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        value={value}
        onChangeText={onChangeText}
        className="flex-1 text-[#2D2D2D] text-sm py-2 ml-2 bg-transparent h-full"
      />
      {onFilterPress && (
        <Pressable onPress={onFilterPress} className="p-1 active:opacity-75">
          <SlidersHorizontal size={18} color="#94A3B8" />
        </Pressable>
      )}
    </View>
  );
};
