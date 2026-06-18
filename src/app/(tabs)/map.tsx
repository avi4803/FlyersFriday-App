import React from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function MapScreen() {


  return (
    
      <SafeAreaView className="flex-1 bg-surface justify-center items-center" edges={['top', 'left', 'right']}>
            <Text>Maps</Text>
          </SafeAreaView>
    
  );
}
