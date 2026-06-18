import React from 'react';
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, ShieldCheck, HelpCircle, BellRing, LogOut, ChevronRight } from 'lucide-react-native';
import { useFlyers } from '../../context/FlyersContext';

export default function ProfileScreen() {
  

  return (
    <SafeAreaView className="flex-1 bg-surface justify-center items-center" edges={['top', 'left', 'right']}>
      <Text>My Profile</Text>
    </SafeAreaView>
  );
}
