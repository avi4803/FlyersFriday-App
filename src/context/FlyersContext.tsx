import React, { createContext, useContext, useState, useEffect } from 'react';
import { Flyer, INITIAL_FLYERS } from '../constants/mockData';

interface FlyersContextType {
  flyers: Flyer[];
  addFlyer: (newFlyer: {
    title: string;
    description: string;
    storeName: string;
    category: 'Grocery' | 'Fashion' | 'Services';
    image: string | null;
    validUntil: string;
    location: string;
  }) => void;
  toggleFollowStore: (storeName: string) => void;
  toggleSaveFlyer: (id: string) => void;
  isStoreFollowed: (storeName: string) => boolean;
  isFlyerSaved: (id: string) => boolean;
}

const FlyersContext = createContext<FlyersContextType | undefined>(undefined);

export const FlyersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flyers, setFlyers] = useState<Flyer[]>([]);

  useEffect(() => {
    // Initialize with mock data
    setFlyers(INITIAL_FLYERS);
  }, []);

  const addFlyer = (newFlyer: {
    title: string;
    description: string;
    storeName: string;
    category: 'Grocery' | 'Fashion' | 'Services';
    image: string | null;
    validUntil: string;
    location: string;
  }) => {
    const freshFlyer: Flyer = {
      id: `f_${Date.now()}`,
      title: newFlyer.title,
      description: newFlyer.description,
      storeName: newFlyer.storeName,
      // Default placeholder avatar for the store
      storeLogo: newFlyer.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&auto=format&fit=crop&q=80',
      category: newFlyer.category,
      // Use fallback image if none provided
      image: newFlyer.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
      distance: `${(Math.random() * 4 + 0.1).toFixed(1)} miles away`,
      views: 0,
      validUntil: newFlyer.validUntil || 'July 31, 2026',
      location: newFlyer.location || 'Springfield Shopping Center',
      followed: isStoreFollowed(newFlyer.storeName),
      saved: false,
    };

    setFlyers((prevFlyers) => [freshFlyer, ...prevFlyers]);
  };

  const toggleFollowStore = (storeName: string) => {
    setFlyers((prevFlyers) =>
      prevFlyers.map((flyer) => {
        if (flyer.storeName === storeName) {
          return { ...flyer, followed: !flyer.followed };
        }
        return flyer;
      })
    );
  };

  const toggleSaveFlyer = (id: string) => {
    setFlyers((prevFlyers) =>
      prevFlyers.map((flyer) => {
        if (flyer.id === id) {
          return { ...flyer, saved: !flyer.saved };
        }
        return flyer;
      })
    );
  };

  const isStoreFollowed = (storeName: string): boolean => {
    const store = flyers.find((f) => f.storeName === storeName);
    return store ? !!store.followed : false;
  };

  const isFlyerSaved = (id: string): boolean => {
    const flyer = flyers.find((f) => f.id === id);
    return flyer ? !!flyer.saved : false;
  };

  return (
    <FlyersContext.Provider
      value={{
        flyers,
        addFlyer,
        toggleFollowStore,
        toggleSaveFlyer,
        isStoreFollowed,
        isFlyerSaved,
      }}
    >
      {children}
    </FlyersContext.Provider>
  );
};

export const useFlyers = () => {
  const context = useContext(FlyersContext);
  if (!context) {
    throw new Error('useFlyers must be used within a FlyersProvider');
  }
  return context;
};
