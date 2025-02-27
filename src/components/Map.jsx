import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { flagemojiToPNG } from "./FlagEmoji";
import { useGeolocation } from "../hooks/useGeolocation";
import { UseUrlPosition } from "../hooks/UseUrlPosition";
import Button from "./Button";

export default function map() {
  const [mapPosition, setMapPosition] = useState([23, 88]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    error,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = UseUrlPosition();
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geoLocationPosition) {
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
      }
    },
    [geoLocationPosition]
  );
  return (
    <div className={styles.mapContainer} to={`form`}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Use your position"}
      </Button>
      <MapContainer
        className={styles.mapContainer}
        center={[Number(mapLat), Number(mapLng)]}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                {city.emoji ? flagemojiToPNG(city.emoji) : ""} {city.cityName}
              </Popup>
            </Marker>
          );
        })}
        {mapLat && <ChangeCenter position={mapPosition} />}
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`, {
        replace: true,
      });
    },
  });
  return null;
}
