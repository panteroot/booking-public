import styles from "./map.module.scss";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import MapDisplay from "./MapDisplay";

type Props = {
  lat?: number;
  lon?: number;
  handleParentPosition: (lat: number, lon: number) => void;
};

const MapSearch = ({
  lat = 51.505,
  lon = -0.09,
  handleParentPosition,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [listAddress, setListAddress] = useState([]);

  const [position, setPosition] = useState<[number, number]>([lat, lon]);

  // sample format
  //   "https://nominatim.openstreetmap.org/search?q=135+pilkington+avenue,+birmingham&format=xml&polygon_kml=1&addressdetails=1";

  const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search";

  const handleSearch = async () => {
    setIsLoading(true);

    interface NominatimParams {
      q: string;
      format: string;
      addressdetails: number;
      polygon_geojson: number;
    }

    const params: NominatimParams = {
      q: search,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };

    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join("&");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    fetch(`${NOMINATIM_BASE_URL}?${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const parsedResut = JSON.parse(result);

        setListAddress(parsedResut);
      })
      .catch((err) => console.log("error: ", err));

    setIsLoading(false);
  };

  const handeSelectPosition = (item: any) => {
    setPosition([item?.lat, item?.lon]);
    setSearch(item.display_name);

    handleParentPosition(item?.lat, item?.lon);
  };

  return (
    <div className={styles.mapSearch}>
      <MapDisplay lat={position[0]} lon={position[1]} />

      <div>
        <div className={styles.formRow}>
          <input
            name="map"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='You can search "Cebu city dunkin" or any meaningful parameters.'
            style={{ fontSize: "16px" }}
          />

          <div className={styles.formButton}>
            <button
              type="button"
              className={styles.buttonSearch}
              onClick={handleSearch}
              disabled={isLoading}
              style={{ fontSize: "20px" }}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
        <div className={styles.formRow}>
          <ul id="listMap">
            {listAddress.map((item: any) => (
              <li
                onClick={() => handeSelectPosition(item)}
                key={item?.osm_id}
                style={{ cursor: "pointer" }}
              >
                {item.display_name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MapSearch;
