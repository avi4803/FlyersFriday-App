import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flyer, INITIAL_FLYERS } from '../constants/mockData';

const FLYERS_STORAGE_KEY = '@flyers_friday_flyers_v1';

interface FlyersStateContextType {
  flyers: Flyer[];
}

interface FlyersActionsContextType {
  addFlyer: (newFlyer: {
    title: string;
    description: string;
    storeName: string;
    category: 'Grocery' | 'Fashion' | 'Services';
    image: string | null;
    validUntil: string;
    location: string;
    frequency?: string;
  }) => void;
  toggleFollowStore: (storeName: string) => void;
  toggleSaveFlyer: (id: string) => void;
}

const FlyersStateContext = createContext<FlyersStateContextType | undefined>(undefined);
const FlyersActionsContext = createContext<FlyersActionsContextType | undefined>(undefined);

export const FlyersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load flyers from AsyncStorage on mount
  useEffect(() => {
    const loadFlyers = async () => {
      try {
        const storedData = await AsyncStorage.getItem(FLYERS_STORAGE_KEY);
        if (storedData) {
          setFlyers(JSON.parse(storedData));
        } else {
          setFlyers(INITIAL_FLYERS);
        }
      } catch (error) {
        console.log('Failed to load flyers state:', error);
        setFlyers(INITIAL_FLYERS);
      } finally {
        setIsLoaded(true);
      }
    };
    loadFlyers();
  }, []);

  // Save flyers to AsyncStorage whenever state changes (after initial load is complete)
  useEffect(() => {
    if (!isLoaded) return;
    const saveFlyers = async () => {
      try {
        await AsyncStorage.setItem(FLYERS_STORAGE_KEY, JSON.stringify(flyers));
      } catch (error) {
        console.log('Failed to save flyers state:', error);
      }
    };
    saveFlyers();
  }, [flyers, isLoaded]);

  // Stable action handlers using functional state updates
  const addFlyer = useCallback((newFlyer: {
    title: string;
    description: string;
    storeName: string;
    category: 'Grocery' | 'Fashion' | 'Services';
    image: string | null;
    validUntil: string;
    location: string;
    frequency?: string;
  }) => {
    setFlyers((prevFlyers) => {
      const isStoreFollowed = (storeName: string): boolean => {
        const store = prevFlyers.find((f) => f.storeName === storeName);
        return store ? !!store.followed : false;
      };

      const freshFlyer: Flyer = {
        id: `f_${Date.now()}`,
        title: newFlyer.title,
        description: newFlyer.description,
        storeName: newFlyer.storeName,
        storeLogo: newFlyer.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&auto=format&fit=crop&q=80',
        category: newFlyer.category,
        image: newFlyer.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
        distance: `${(Math.random() * 4 + 0.1).toFixed(1)} miles away`,
        views: 0,
        validUntil: newFlyer.validUntil || 'July 31, 2026',
        location: newFlyer.location || 'Springfield Shopping Center',
        followed: isStoreFollowed(newFlyer.storeName),
        saved: false,
        frequency: newFlyer.frequency || 'Weekly',
      };

      return [freshFlyer, ...prevFlyers];
    });
  }, []);

  const toggleFollowStore = useCallback((storeName: string) => {
    setFlyers((prevFlyers) =>
      prevFlyers.map((flyer) => {
        if (flyer.storeName === storeName) {
          return { ...flyer, followed: !flyer.followed };
        }
        return flyer;
      })
    );
  }, []);

  const toggleSaveFlyer = useCallback((id: string) => {
    setFlyers((prevFlyers) =>
      prevFlyers.map((flyer) => {
        if (flyer.id === id) {
          return { ...flyer, saved: !flyer.saved };
        }
        return flyer;
      })
    );
  }, []);

  const actions = useMemo(() => ({
    addFlyer,
    toggleFollowStore,
    toggleSaveFlyer,
  }), [addFlyer, toggleFollowStore, toggleSaveFlyer]);

  return (
    <FlyersStateContext.Provider value={{ flyers }}>
      <FlyersActionsContext.Provider value={actions}>
        {children}
      </FlyersActionsContext.Provider>
    </FlyersStateContext.Provider>
  );
};

export const useFlyers = () => {
  const context = useContext(FlyersStateContext);
  if (!context) {
    throw new Error('useFlyers must be used within a FlyersProvider');
  }
  return context;
};

export const useFlyersActions = () => {
  const context = useContext(FlyersActionsContext);
  if (!context) {
    throw new Error('useFlyersActions must be used within a FlyersProvider');
  }
  return context;
};
