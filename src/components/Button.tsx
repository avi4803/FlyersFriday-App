import React from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'secondary' | 'danger';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  className = '',
  textClassName = '',
}) => {
  const getContainerClass = (pressed: boolean) => {
    let base = 'flex-row items-center justify-center rounded-xl py-3.5 px-4 transition-all duration-150 ';
    
    if (variant === 'primary') {
      base += 'bg-[#e6c15d] active:brightness-95 ';
    } else if (variant === 'outline') {
      base += 'bg-transparent border border-[#e6c15d] ';
    } else if (variant === 'secondary') {
      base += 'bg-[#efeded] active:bg-[#e9e8e8] ';
    } else if (variant === 'danger') {
      base += 'bg-[#ba1a1a] ';
    }

    if (pressed) {
      base += 'scale-98 opacity-90 ';
    }
    if (disabled || loading) {
      base += 'opacity-50 ';
    }

    return `${base} ${className}`;
  };

  const getTextClass = () => {
    let base = 'font-bold text-sm text-center ';
    
    if (variant === 'primary') {
      base += 'text-[#3f2e00] ';
    } else if (variant === 'outline') {
      base += 'text-[#755b00] ';
    } else if (variant === 'secondary') {
      base += 'text-[#1b1c1c] ';
    } else if (variant === 'danger') {
      base += 'text-white ';
    }

    return `${base} ${textClassName}`;
  };

  return (
    <Pressable
      onPress={disabled || loading ? undefined : onPress}
      style={({ pressed }) => [{ transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }] }]}
      className="active:opacity-95"
    >
      {({ pressed }) => (
        <View className={getContainerClass(pressed)}>
          {loading ? (
            <ActivityIndicator color={variant === 'primary' ? '#3f2e00' : '#755b00'} size="small" />
          ) : (
            <View className="flex-row items-center justify-center">
              {icon && <View className="mr-2">{icon}</View>}
              <Text className={getTextClass()}>{label}</Text>
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
};
