// @ts-nocheck
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useState } from 'react';
import events from './events.json';

export default function App() {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [meetingPoint, setMeetingPoint] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  console.log('region: ', region);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        // followsUserLocation
        initialRegion={region}
        onRegionChange={setRegion}
        style={styles.map}
      >
        <Marker
          pinColor="blue"
          coordinate={meetingPoint}
          draggable
          onDragEnd={(e) => setMeetingPoint(e.nativeEvent.coordinate)}
        />

        {events.map((event) => (
          <Marker
            coordinate={{
              latitude: event.latitude,
              longitude: event.longitude,
            }}
            title={event.title}
            description={event.short_description}
            // image={require('./assets/pin.png')}
          />
        ))}

        {/* <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
        <Marker coordinate={{ latitude: 37.78025, longitude: -122.4324 }} />
        <Marker coordinate={{ latitude: 37.78025, longitude: -122.4024 }} /> */}
      </MapView>

      <View
        style={{
          position: 'absolute',
          backgroundColor: 'whitesmoke',
          bottom: 70,
          padding: 10,
          left: 10,
          right: 10,
          borderWidth: 1,
          borderColor: 'gray',
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>
          Region: {region.latitude.toFixed(4)}:{region.longitude.toFixed(4)}
        </Text>
        <Text style={{ fontWeight: 'bold' }}>
          Meeting point: {meetingPoint.latitude.toFixed(4)}:
          {meetingPoint.longitude.toFixed(4)}
        </Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
