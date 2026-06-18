import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface SelectFieldProps {
  label?: string;
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  containerClassName?: string;
  helperText?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
  containerClassName = '',
  helperText,
}) => {
  return (
    <View className={`flex-col gap-2 ${containerClassName}`}>
      {label && (
        <Text className="text-sm font-bold text-on-surface">
          {label}
        </Text>
      )}
      <View className="bg-white border border-[#d0c5b1] rounded-xl p-1 flex-row">
        {options.map((option) => {
          const isActive = selectedValue === option;
          return (
            <Pressable
              key={option}
              onPress={() => onValueChange(option)}
              className={`flex-1 py-2 rounded-lg items-center justify-center ${
                isActive ? 'bg-[#e6c15d] shadow-sm' : 'bg-transparent active:bg-gray-100'
              }`}
            >
              <Text
                className={`text-xs font-bold ${
                  isActive ? 'text-[#3f2e00] font-black' : 'text-on-surface-variant font-semibold'
                }`}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {helperText && (
        <Text className="text-[10px] text-gray-500 italic text-center mt-1">
          {helperText}
        </Text>
      )}
    </View>
  );
};
