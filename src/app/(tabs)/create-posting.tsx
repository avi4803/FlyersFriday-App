import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, Modal, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Image as ImageIcon, ChevronRight } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useFlyers } from '../../context/FlyersContext';
import { InputField } from '../../components/InputField';
import { SelectField } from '../../components/SelectField';

export default function CreatePostingScreen() {
  const router = useRouter();
  const { addFlyer } = useFlyers();

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [storeName, setStoreName] = useState('My Local Shop');
  const [category, setCategory] = useState<'Grocery' | 'Fashion' | 'Services'>('Grocery');
  const [frequency, setFrequency] = useState('Weekly');
  const [location, setLocation] = useState('Downtown District, Brooklyn, NY');
  const [validUntil, setValidUntil] = useState('Oct 18, 2026');
  const [image, setImage] = useState<string | null>(null);

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Preview Modal
  const [previewVisible, setPreviewVisible] = useState(false);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Camera roll access is required to select images. Placeholder will be used.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!title.trim()) tempErrors.title = 'Title is required';
    if (!description.trim()) tempErrors.description = 'Description is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePreview = () => {
    if (validate()) {
      setPreviewVisible(true);
    }
  };

  const handlePublish = () => {
    if (validate()) {
      addFlyer({
        title,
        description,
        storeName,
        category,
        image,
        validUntil,
        location,
      });

      setPreviewVisible(false);
      Alert.alert('Success', 'Flyer posted successfully!', [
        { text: 'OK', onPress: () => router.push('/' as any) },
      ]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      {/* Top App Bar */}
      <View className="bg-white border-b border-surface-container py-4 px-4 flex-row items-center justify-between">
        <Pressable
          onPress={() => router.back()}
          className="text-on-surface-variant p-1 -ml-1 rounded-full active:bg-surface-container"
        >
          <X size={20} color="#4d4637" />
        </Pressable>
        <Text className="text-base font-bold text-on-surface">Create New Posting</Text>
        <View className="w-8" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 110 }} className="flex-1 p-4">
          
          {/* Progress Indicator */}
          <View className="flex-row justify-center items-center gap-1.5 py-4">
            <View className="w-6 h-1.5 bg-[#e6c15d] rounded-full" />
            <View className="w-1.5 h-1.5 bg-surface-variant rounded-full" />
            <View className="w-1.5 h-1.5 bg-surface-variant rounded-full" />
          </View>

          {/* Section 1: Flyer Visuals */}
          <View className="flex-col gap-2 mt-2">
            <Text className="text-sm font-bold text-on-surface">Flyer Visuals</Text>
            
            <View className="bg-surface border-2 border-dashed border-[#d0c5b1] rounded-2xl p-6 flex-col items-center justify-center gap-2 text-center">
              {image ? (
                <View className="w-full aspect-[4/3] rounded-xl overflow-hidden relative">
                  <Image source={{ uri: image }} className="w-full h-full object-cover" />
                  <Pressable
                    onPress={pickImage}
                    className="absolute bottom-2 right-2 bg-black/60 px-3 py-1.5 rounded-lg"
                  >
                    <Text className="text-white text-xs font-bold">Replace</Text>
                  </Pressable>
                </View>
              ) : (
                <>
                  <View className="w-12 h-12 bg-surface-container rounded-full items-center justify-center">
                    <ImageIcon size={24} color="#755b00" />
                  </View>
                  <Text className="text-sm font-bold text-on-surface">Upload Flyer Design</Text>
                  <Text className="text-xs text-on-surface-variant max-w-[240px] text-center">
                    Tap to select or drag your pamphlet image here. Supports JPG, PNG.
                  </Text>
                  <Pressable
                    onPress={pickImage}
                    className="mt-2 bg-[#e6c15d] px-6 py-2 rounded-xl active:brightness-95"
                  >
                    <Text className="text-on-primary font-bold text-xs">Select Image</Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>

          {/* Section 2: Posting Details using InputField */}
          <View className="flex-col gap-4 mt-6">
            <Text className="text-sm font-bold text-on-surface">Posting Details</Text>
            
            <InputField
              label="Posting Title"
              placeholder="e.g., Weekly Grocery Deals"
              value={title}
              onChangeText={setTitle}
              error={errors.title}
            />

            <InputField
              label="Description"
              placeholder="Describe the amazing offers in your flyer..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              error={errors.description}
              inputClassName="min-h-[100]"
              style={{ textAlignVertical: 'top' }}
            />
          </View>

          {/* Section 3: Target Region */}
          <View className="flex-col gap-2 mt-6">
            <Text className="text-sm font-bold text-on-surface">Target Region</Text>
            <View className="bg-white rounded-2xl overflow-hidden border border-surface-container-highest">
              <View className="relative w-full h-32 bg-slate-100">
                <Image
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7IxCzUVz5ZMaT0PvjFNkoRJ0NYqhwbqWUCBvBYmk8-Q6iUuuhq-TPKkeQqSb99vz4SyKIHJSLTAAniSiquyWbbV1FSCw0EcrismvPRl1BDuE_b8DmwQMXE_AcUguh122qNG-e1vQZqMiVzLVWo-2ZG1hD9JbYAAFq_QSBRjbAnw_-3T9hybXR1L_U1AETtvpV9eefoL6uKJrOoCsp_FWAZ5VCe7bBmII9NGs9kHt1g_6qi7iADgjR0fffE4aaBW72rUq9Jh-039Y' }}
                  className="w-full h-full opacity-80"
                  resizeMode="cover"
                />
                {/* Marker circle overlay */}
                <View className="absolute inset-0 items-center justify-center">
                  <View className="w-16 h-16 rounded-full border-2 border-[#e6c15d] bg-[#e6c15d]/20 items-center justify-center">
                    <View className="w-3 h-3 bg-white rounded-full border border-[#e6c15d]" />
                  </View>
                </View>
              </View>
              
              <View className="p-3 flex-row justify-between items-center bg-white">
                <View className="flex-col">
                  <Text className="text-xs font-bold text-on-surface">Downtown District</Text>
                  <Text className="text-[10px] text-gray-500 font-semibold mt-0.5">5 mile radius</Text>
                </View>
                <Pressable className="flex-row items-center">
                  <Text className="text-xs text-[#755b00] font-bold">Change Area</Text>
                  <ChevronRight size={14} color="#755b00" />
                </Pressable>
              </View>
            </View>
          </View>

          {/* Section 4: Posting Frequency using SelectField */}
          <SelectField
            label="Posting Frequency"
            options={['Daily', 'Weekly', 'Monthly']}
            selectedValue={frequency}
            onValueChange={setFrequency}
            helperText="Flyer will be refreshed every Friday morning."
            containerClassName="mt-6"
          />

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Footer sticky action button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-surface-container p-4 pb-safe">
        <Pressable
          onPress={handlePreview}
          className="w-full bg-[#e6c15d] py-3.5 rounded-xl items-center justify-center active:scale-[0.98]"
        >
          <Text className="text-on-primary font-bold text-sm">
            Preview & Post Flyer
          </Text>
        </Pressable>
      </View>

      {/* High-Fidelity PREVIEW MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={previewVisible}
        onRequestClose={() => setPreviewVisible(false)}
      >
        <View className="flex-1 bg-black/85 justify-end">
          <View className="bg-white border-t border-surface-container rounded-t-3xl max-h-[85%] overflow-hidden flex-col">
            <View className="p-4 border-b border-surface-container flex-row items-center justify-between">
              <Text className="text-on-surface font-extrabold text-base">Flyer Preview</Text>
              <Pressable
                onPress={() => setPreviewVisible(false)}
                className="p-1.5 rounded-full bg-surface-container active:bg-surface-container-high"
              >
                <X size={16} color="#1b1c1c" />
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }} className="flex-col">
              <Text className="text-on-surface-variant text-xs font-semibold mb-3">
                This is how your flyer will look on the local feed:
              </Text>

              {/* Flyer Card mockup */}
              <View className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg mb-6 flex-col">
                <View className="relative w-full aspect-[4/5] bg-slate-950">
                  {image ? (
                    <Image source={{ uri: image }} className="w-full h-full object-cover" />
                  ) : (
                    <View className="w-full h-full items-center justify-center bg-slate-900">
                      <ImageIcon size={48} color="#7f7665" />
                      <Text className="text-on-surface-variant text-xs mt-2">No Image (Default Used)</Text>
                    </View>
                  )}
                  <View className="absolute top-3 left-3 bg-[#e6c15d] px-3 py-1 rounded-lg">
                    <Text className="text-on-primary text-[10px] font-bold uppercase tracking-wider">
                      {category}
                    </Text>
                  </View>
                  <View className="absolute bottom-3 left-3 bg-white/95 px-2.5 py-1.5 rounded-lg border border-gray-100 flex-row items-center">
                    <Text className="text-on-surface text-[10px] font-medium ml-1">0.1 miles away</Text>
                  </View>
                </View>

                <View className="p-4 space-y-2 flex-col">
                  <View className="flex-row items-center space-x-2">
                    <Text className="text-on-surface-variant text-xs font-semibold">{storeName}</Text>
                  </View>

                  <Text className="text-on-surface text-base font-bold leading-snug">{title}</Text>
                  
                  <View className="h-[1px] bg-surface-container my-1" />

                  <View className="flex-row items-center justify-between">
                    <Text className="text-on-surface-variant text-[10px] font-medium">
                      Expires: {validUntil}
                    </Text>
                    <View className="bg-surface-container px-2 py-0.5 rounded border border-[#d0c5b1]">
                      <Text className="text-on-surface text-[9px] font-bold uppercase tracking-wider">{frequency}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <Text className="text-on-surface font-semibold mb-2">Description Detail:</Text>
              <Text className="text-on-surface-variant text-xs leading-relaxed bg-surface-container-low border border-surface-container-highest rounded-xl p-3 mb-6">
                {description}
              </Text>

              {/* Action Buttons inside Preview */}
              <View className="flex-row items-center gap-3 mb-6">
                <Pressable
                  onPress={() => setPreviewVisible(false)}
                  className="flex-1 py-3 bg-surface-container rounded-xl items-center justify-center active:bg-surface-container-high"
                >
                  <Text className="text-on-surface font-bold text-sm">Edit Info</Text>
                </Pressable>
                
                <Pressable
                  onPress={handlePublish}
                  className="flex-1 bg-[#e6c15d] py-3 rounded-xl items-center justify-center active:brightness-95"
                >
                  <Text className="text-on-primary font-bold text-sm">Publish Flyer</Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
