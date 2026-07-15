import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [lastNavigatedLocation, setLastNavigatedLocation] = useState(null);
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [hasVisitedGoogleMaps, setHasVisitedGoogleMaps] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem('favorites');
      const parsed = saved ? JSON.parse(saved) : [];
      setFavorites(parsed);
      console.log('Loaded favorites:', parsed);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const addToFavorites = async (location) => {
    try {
      if (!location || !location.name || !location.address || !location.location) {
        console.warn('Invalid location object:', location);
        return;
      }

      const saved = await AsyncStorage.getItem('favorites');
      const parsed = saved ? JSON.parse(saved) : [];

      const alreadyExists = parsed.some(
        (item) => item.name === location.name && item.address === location.address
      );

      if (alreadyExists) return;

      const updated = [...parsed, location];
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
      setFavorites(updated);
      console.log('Added to favorites:', location);
    } catch (error) {
      console.error('Error saving to favorites:', error);
    }
  };

  const saveFeedback = (feedbackData) => {
    if (lastNavigatedLocation && feedbackData) {
      const newFeedback = {
        location: lastNavigatedLocation,
        ...feedbackData,
        timestamp: new Date().toISOString(),
      };
      setFeedbacks((prev) => [...prev, newFeedback]);
    }
  };

  return (
    <FeedbackContext.Provider
      value={{
        lastNavigatedLocation,
        setLastNavigatedLocation,
        isFeedbackModalVisible,
        showFeedbackModal: () => setIsFeedbackModalVisible(true),
        hideFeedbackModal: () => setIsFeedbackModalVisible(false),
        feedbacks,
        saveFeedback,
        hasVisitedGoogleMaps,
        setHasVisitedGoogleMaps,
        favorites,
        addToFavorites,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
