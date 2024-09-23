import styles from "./map.module.scss";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type Props = {
  lat?: number;
  lon?: number;
};

const MapDisplay = ({ lat = 51.505, lon = -0.09 }: Props) => {
  const icon = L.icon({
    iconUrl: "/map-indicator.png",
    iconSize: [28, 38],
  });

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        key={[lat, lon].toString()}
        className={styles.map}
        center={[lat, lon]}
        zoom={15} //13 reco
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]} icon={icon}>
          <Popup>This is the location.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapDisplay;
