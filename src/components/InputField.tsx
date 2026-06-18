import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  containerClassName = '',
  inputClassName = '',
  ...props
}) => {
  return (
    <View className={`flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <Text className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
          {label}
        </Text>
      )}
      <TextInput
        placeholderTextColor="#c8c6c5"
        className={`w-full bg-white border ${
          error ? 'border-red-600' : 'border-[#d0c5b1]'
        } rounded-xl px-3 py-3 text-sm text-on-surface ${inputClassName}`}
        {...props}
      />
      {error && (
        <Text className="text-red-600 text-xs mt-0.5">
          {error}
        </Text>
      )}
    </View>
  );
};
