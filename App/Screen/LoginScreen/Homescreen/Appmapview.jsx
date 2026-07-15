import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React, { useContext, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { UserLocationContext } from '../../../context/userlocationcontext';

const nearbyEVStations = [
  {
    id: 1,
    name: 'Bolt Earth EV Charging Station',
    latitude: 18.497727,
    longitude: 73.840431,
    area: 'Dattawadi, Pune',
  },
  {
    id: 2,
    name: 'Kazam - Parvati Paytha Charging Station',
    latitude: 18.4885,
    longitude: 73.85,
    area: 'Parvati Paytha, Pune',
  },
  {
    id: 3,
    name: 'UTPL - EV Charging Station',
    latitude: 18.489,
    longitude: 73.848,
    area: 'Sahakar Nagar, Pune',
  },
  {
    id: 4,
    name: 'Tata Power EV Charging Station',
    latitude: 18.501884,
    longitude: 73.862042,
    area: 'Swargate, Pune',
  },
  {
    id: 5,
    name: 'Mahindra EV Charging Hub',
    latitude: 18.522,
    longitude: 73.823,
    area: 'Hadapsar, Pune',
  },
  {
    id: 6,
    name: 'Exide EV Charging Station',
    latitude: 18.529,
    longitude: 73.828,
    area: 'Viman Nagar, Pune',
  },
];

export default function Appmapview() {
  const { location } = useContext(UserLocationContext);
  const [selectedStation, setSelectedStation] = useState(null);

  if (!location || !location.latitude || !location.longitude) {
    return <Text>Loading location...</Text>;
  }

  const handleOutsideTap = () => {
    setSelectedStation(null);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsideTap}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You are here"
          />

          {nearbyEVStations.map((station) => (
            <Marker
              key={station.id}
              coordinate={{ latitude: station.latitude, longitude: station.longitude }}
              title={station.name}
              onPress={() => setSelectedStation(station)}
              pinColor="green" // Make marker green
            />
          ))}
        </MapView>

        {selectedStation && (
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>{selectedStation.name}</Text>
            <Text style={styles.popupAddress}>{selectedStation.area}</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  popup: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  popupTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  popupAddress: {
    fontSize: 14,
    color: '#555',
  },
});
