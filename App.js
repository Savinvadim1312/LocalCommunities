// @ts-nocheck
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useState, useRef, useMemo, useCallback } from 'react';
import events from './events.json';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

export default function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
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

  // ref
  const bottomSheetRef = useRef(null);
  const mapView = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          ref={mapView}
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
              key={event.title}
              pinColor={event === selectedEvent ? 'green' : 'red'}
              onPress={() => {
                setSelectedEvent(event);
                bottomSheetRef.current.snapToIndex(1);
              }}
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

        <BottomSheet
          ref={bottomSheetRef}
          enablePanDownToClose
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetFlatList
            data={events}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setSelectedEvent(item);
                  mapView.current.animateToRegion({
                    latitude: item.latitude - 0.05,
                    longitude: item.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                  });
                }}
                style={{
                  padding: 10,
                  borderWidth: 0.5,
                  borderColor: 'gainsboro',
                  margin: 3,
                  borderRadius: 5,
                  backgroundColor:
                    item === selectedEvent ? 'lime' : 'transparent',
                }}
              >
                <Text>{item.title}</Text>
              </Pressable>
            )}
          />
        </BottomSheet>

        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
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
