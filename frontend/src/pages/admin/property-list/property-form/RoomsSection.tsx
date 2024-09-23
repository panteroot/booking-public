import { useFormContext } from "react-hook-form";
import styles from "./propertyForm.module.scss";
import { PropertyDTO } from "@repositories/PropertyRepository";

const RoomsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PropertyDTO>();

  return (
    <div className={styles.form}>
      <span className={styles.optionTitle}>Room Details:</span>
      <div className={styles.formRow}>
        <label>No of Physical Rooms</label>
        <input
          type="number"
          min={1}
          {...register("totalPhysicalRooms", {
            required: "This field is required!",
          })}
        />
      </div>
      <div className={styles.formRow}>
        <div></div>
        {errors.totalPhysicalRooms && (
          <span className={styles.errorRoomSection}>
            {errors.totalPhysicalRooms.message}
          </span>
        )}
      </div>

      <div className={styles.formRow}>
        <label>No of Available Rooms</label>
        <input
          type="number"
          min={1}
          {...register("totalAvailableRooms", {
            required: "This field is required!",
          })}
        />
      </div>
      <div className={styles.formRow}>
        <div></div>
        {errors.totalAvailableRooms && (
          <span className={styles.errorRoomSection}>
            {errors.totalAvailableRooms.message}
          </span>
        )}
      </div>

      <br />
      <span className={styles.optionTitle}>Featured Facilities:</span>
      <div className={styles.facilities}>
        {[
          "Spacious Parking",
          "Clean Rooms",
          "Blazing Fast Wifi",
          "Fitness center",
          "Near Tourist Spots",
          "Near Airport",
        ].map((facility) => (
          <div className={styles.formRow}>
            <label>
              <input
                key={facility}
                type="checkbox"
                value={facility}
                {...register("featuredFacilities", {
                  validate: (facilities) => {
                    if (!facilities || facilities.length < 1)
                      return "Select at least one facility!";
                  },
                })}
              />
              {facility}
            </label>
          </div>
        ))}
      </div>
      <div className={styles.formRow}>
        {errors.featuredFacilities && (
          <span className={styles.error}>
            {errors.featuredFacilities.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default RoomsSection;
