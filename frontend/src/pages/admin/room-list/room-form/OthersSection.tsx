import styles from "./roomForm.module.scss";
import { useFormContext } from "react-hook-form";
import { RoomDTO } from "@repositories/RoomRepository";

const OthersSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RoomDTO>();

  const propertyViews = ["Bay View", "City View", "Mountain View"];

  const propertyMeals = [
    "Free Breakfast",
    "Free Dinner",
    "Free Breakfast and Dinner",
  ];

  const beds = [
    "1 twin bed",
    "2 twin beds",
    "1 queen bed",
    "2 queen beds",
    "3 queen beds",
    "1 king bed",
    "2 king beds",
    "1 sofa bed",
  ];

  return (
    <div className={styles.form}>
      <div className={styles.formRow}>
        <label>View</label>
        <select
          {...register("facilities.view", {
            required: "This field is required!",
          })}
        >
          <option value="" selected>
            None
          </option>
          {propertyViews.map((view) => (
            <option value={view}>{view}</option>
          ))}
        </select>
      </div>
      <div className={styles.formRow}>
        <div></div>
        {errors.facilities?.view && (
          <span className={styles.error}>
            {" "}
            {errors.facilities.view.message}
          </span>
        )}
      </div>

      <div className={styles.formRow}>
        <label>Meal</label>
        <select
          {...register("facilities.meal", {
            required: "This field is required!",
          })}
        >
          <option value="" selected>
            None
          </option>
          {propertyMeals.map((meal) => (
            <option value={meal}>{meal}</option>
          ))}
        </select>
      </div>
      <div className={styles.formRow}>
        <div></div>
        {errors.facilities?.meal && (
          <span className={styles.error}>
            {" "}
            {errors.facilities.meal.message}
          </span>
        )}
      </div>

      <br />
      <div className={styles.beds}>
        <div className={styles.col}>
          <label className={styles.optionTitle}>Bed:</label>
          {beds.map((bed) => (
            <div className={styles.formRow}>
              <label>
                <input
                  type="checkbox"
                  value={bed}
                  {...register("facilities.bed", {
                    validate: (beds) => {
                      if (!beds || beds.length < 1)
                        return "Please select at least one bed!";
                    },
                  })}
                />
                {bed}
              </label>
            </div>
          ))}
          <div className={styles.formRow}>
            {errors.facilities?.bed && (
              <span className={styles.error}>
                {errors.facilities.bed.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.formRow}>
        <label>Max Adult</label>
        <input
          type="number"
          min={1}
          {...register("adultCount", {
            required: "This field is required!",
          })}
        />
      </div>
      <div className={styles.formRow}>
        <div></div>
        {errors.adultCount && (
          <span className={styles.error}>{errors.adultCount.message}</span>
        )}
      </div>

      <div className={styles.formRow}>
        <label>Max Children</label>
        <input
          type="number"
          min={0}
          {...register("childCount", {
            required: "This field is required!",
          })}
        />
      </div>
      <div className={styles.formRow}>
        <div></div>
        {errors.childCount && (
          <span className={styles.error}>{errors.childCount.message}</span>
        )}
      </div>
    </div>
  );
};

export default OthersSection;
