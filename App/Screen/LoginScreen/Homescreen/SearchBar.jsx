import React, { useContext } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FeedbackContext } from './../../../context/FeedbackContext';

export default function SearchBar() {
  const { setLastNavigatedLocation, setHasVisitedGoogleMaps } = useContext(FeedbackContext); // Using the context to get setLastNavigatedLocation

  const handleRedirect = (location, placeDetails) => {
    if (!setLastNavigatedLocation || !setHasVisitedGoogleMaps) {
      console.log("FeedbackContext is not available");
      return;
    }

    // Destructure the coordinates from the selected place
    const { lat, lng } = location;
    const name = placeDetails.name || 'Unnamed Station'; // Get the station name
    const address = placeDetails.vicinity || placeDetails.formatted_address || 'Unknown Address'; // Get the address

    // Save both name, address, and coordinates for feedback
    setLastNavigatedLocation({
      name,
      address,
      lat,
      lng
    });

    // Set the flag indicating the user has visited Google Maps
    setHasVisitedGoogleMaps(true); 

    // Construct the Google Maps URL using the exact coordinates of the EV station
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&zoom=15`;

    // Redirect to Google Maps with precise coordinates
    Linking.openURL(mapsUrl);
  };

  return (
    <View style={styles.searchBarContainer}>
      <GooglePlacesAutocomplete
        placeholder="Search EV Stations"
        fetchDetails={true} // Ensures detailed information for the selected place
        onPress={(data, details = null) => {
          // Get the geometry location (latitude and longitude) from the selected details
          const { lat, lng } = details.geometry.location;
          handleRedirect({ lat, lng }, details); // Pass the full details, including name and address
        }}
        query={{
          key: 'AIzaSyBxkCDzuExLyyOFF_WL373vT4HEu3X0MnE', // Your Google Maps API key
          language: 'en',
        }}
        styles={{
          textInput: {
            height: 50,
            borderColor: '#ddd',
            borderWidth: 1,
            borderRadius: 5,
            paddingLeft: 10,
            marginBottom: 10,
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    position: 'absolute',
    top: 100,
    width: '100%',
    padding: 10,
    zIndex: 1,
  },
});
