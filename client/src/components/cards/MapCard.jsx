import React, { useCallback, useMemo, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import PropTypes from 'prop-types';

function MapCard({ ad }) {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    async: true,
  });

  console.log("Is Google Map loaded?", isLoaded);

  /*if (!ad?.location?.coordinates) {
    return <div>No location data available</div>;
  }*/

  // Muistetaan 'center'-objekti vain, jos 'ad.location.coordinates' muuttuu
  const center = useMemo(() => ({
    lat: ad?.location?.coordinates?.[1] || 0,
    lng: ad?.location?.coordinates?.[0] || 0,
  }), [ad?.location?.coordinates]);

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    console.log("Map loaded");
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [center]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (!ad?.location?.coordinates) {
    return <div>No location data available</div>;
  }

  return isLoaded ? (
    <div className="w-full h-96 p-2 mx-4">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
// Lisää prop-tyyppien validointi
MapCard.propTypes = {
  ad: PropTypes.shape({
    location: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
  }),
};

export default React.memo(MapCard);

