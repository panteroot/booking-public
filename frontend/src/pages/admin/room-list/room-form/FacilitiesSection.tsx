import { useFormContext } from "react-hook-form";
import styles from "./roomForm.module.scss";
import { RoomDTO } from "@repositories/RoomRepository";

const FacilitiesSection = () => {
  const roomFacilities = [
    "Desk",
    "Safe",
    "Upper floors accessible by elevator",
    "Flat-screen TV",
    "Refrigerator",
    "Soundproof",
    "Air conditioning",
    "Clothes rack",
    "Balcony",
    "Terrace",
  ];

  const bathroomItems = [
    "Free toiletries",
    "Mirror",
    "Toilet",
    "Bathtub",
    "Hot & Cold Shower",
    "Shower",
    "Facial Kit",
    "Hairdryer",
    "Toilet paper",
  ];

  const {
    register,
    formState: { errors },
  } = useFormContext<RoomDTO>();

  return (
    <div className={styles.facilities}>
      <div className={styles.col}>
        <span className={styles.optionTitle}>In the room:</span>
        {roomFacilities.map((facility) => (
          <div className={styles.formRow}>
            <label>
              <input
                type="checkbox"
                value={facility}
                {...register("facilities.room", {
                  validate: (facilities) => {
                    if (!facilities || facilities.length < 1)
                      return "Select at least one item!";
                  },
                })}
              />
              {facility}
            </label>
          </div>
        ))}
        <div className={styles.formRow}>
          {errors.facilities?.room && (
            <span style={{ color: "red" }}>
              {errors.facilities.room.message}
            </span>
          )}
        </div>
      </div>
      <div className={styles.col}>
        <span className={styles.optionTitle}>In the bathroom:</span>
        {bathroomItems.map((item) => (
          <div className={styles.formRow}>
            <label>
              <input
                type="checkbox"
                value={item}
                {...register("facilities.bathroom", {
                  validate: (rooms) => {
                    if (!rooms || rooms.length < 1)
                      return "Select at least one item!";
                  },
                })}
              />
              {item}
            </label>
          </div>
        ))}

        <div className={styles.formRow}>
          {errors.facilities?.room && (
            <span style={{ color: "red" }}>
              {errors.facilities.room.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilitiesSection;
