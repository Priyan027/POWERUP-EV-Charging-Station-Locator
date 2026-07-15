import React, { useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import Appmapview from './Appmapview';
import Header from './header';
import SearchBar from './SearchBar';
import { UserLocationContext } from './../../../context/userlocationcontext';
import GlobalApi from './../utils/GlobalApi';

import FeedbackModal from './FeedbackModal';
import { FeedbackContext } from './../../../context/FeedbackContext';
import { useFocusEffect } from '@react-navigation/native';
import ReactNative from 'react';

export default function HomeScreen() {
  const { location, setLocation } = useContext(UserLocationContext);

  const {
    isFeedbackModalVisible,
    showFeedbackModal,
    hideFeedbackModal,
    lastNavigatedLocation,
    hasVisitedGoogleMaps, // Updated variable to track map visit
    setHasVisitedGoogleMaps, // Function to reset the visited status
  } = useContext(FeedbackContext);

  useFocusEffect(
    ReactNative.useCallback(() => {
      if (hasVisitedGoogleMaps && lastNavigatedLocation) {
        showFeedbackModal(); // Show feedback modal when user returns after visiting Google Maps
        setHasVisitedGoogleMaps(false); // Reset the map visit status
      }
    }, [hasVisitedGoogleMaps, lastNavigatedLocation, setHasVisitedGoogleMaps])
  );

  useEffect(() => {
    location && GetNearByPlace();
  }, [location]);

  const GetNearByPlace = () => {
    const data = {
      includedTypes: ['electric_vehicle_charging_station'],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
          radius: 5000.0,
        },
      },
    };

    GlobalApi.NewNearByPlace(data)
      .then((resp) => {
        console.log(JSON.stringify(resp.data));
      })
      .catch((err) => {
        console.log('Error fetching places:', err?.message || err);
      });
  };

  return (
    <View style={styles.container}>
      <Appmapview />
      <Header />
      <SearchBar />

      {isFeedbackModalVisible && (
        <FeedbackModal onClose={hideFeedbackModal} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
