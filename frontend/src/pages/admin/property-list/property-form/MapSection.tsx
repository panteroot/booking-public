import styles from "./propertyForm.module.scss";
import { useFormContext } from "react-hook-form";
import { PropertyDTO } from "@repositories/PropertyRepository";
import MapSearch from "@components/common/map/MapSearch";
import { useEffect, useState } from "react";

const MapSection = () => {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext<PropertyDTO>();

  const property = getValues();
  const [position, setPosition] = useState<[number, number]>([
    property.latitude,
    property.longitude,
  ]);

  useEffect(() => {
    if (property.latitude && property.longitude)
      setValue("position", [property.latitude, property.longitude].toString());
  }, [property.latitude, property.longitude, setValue]);

  const handlePosition = (lat: number, lon: number) => {
    setPosition([lat, lon]);
    setValue("position", [lat, lon].toString());
    errors.position = undefined;
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <span>Find Property in Map</span>
      </div>

      <div className={styles.form}>
        <div className={styles.mapContainer}>
          <MapSearch
            lat={position[0]}
            lon={position[1]}
            handleParentPosition={handlePosition}
          />
        </div>

        <div
          className={styles.formRow}
          style={{ width: "43%", alignItems: "center" }}
        >
          <label>Map position</label>
          <input
            style={{
              background: "#d3d3d3",
              cursor: "not-allowed",
            }}
            type="text"
            {...register("position", {
              required: "No mapped position! Select a place from search list.",
            })}
            readOnly
          />
        </div>
        <div className={styles.formRow}>
          {errors.position && (
            <span className={styles.error}> {errors.position.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapSection;
