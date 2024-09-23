import { useFormContext } from "react-hook-form";
import styles from "./propertyForm.module.scss";
import { PropertyDTO } from "@repositories/PropertyRepository";

const FacilitiesSection = () => {
  const propertyFacilities = [
    "Breakfast",
    "Private Bathroom",
    "Restaurant",
    "Fitness center",
    "Non-smoking rooms",
    "Room service",
    "Shower",
    "Facilities for disabled guests",
    "Air conditioning",
    "View",
  ];

  const propertyViews = ["Bay View", "City View", "Mountain View"];

  const propertyMeals = [
    "Free Breakfast",
    "Free Dinner",
    "Free Breakfast and Dinner",
  ];

  const {
    register,
    formState: { errors },
  } = useFormContext<PropertyDTO>();

  return (
    <div className={styles.facilities}>
      <div className={styles.col}>
        <span className={styles.optionTitle}>Property:</span>
        {propertyFacilities.map((facility) => (
          <div className={styles.formRow}>
            <label>
              <input
                key={facility}
                type="checkbox"
                value={facility}
                {...register("facilities.property", {
                  validate: (facilities) => {
                    if (!facilities || facilities.length < 1)
                      return "Select at least one property!";
                  },
                })}
              />
              {facility}
            </label>
          </div>
        ))}
        <div className={styles.formRow}>
          <div></div>
          {errors.facilities?.property && (
            <span className={styles.error} style={{ color: "red" }}>
              {errors.facilities.property.message}
            </span>
          )}
        </div>
      </div>

      <div className={styles.col}>
        <span className={styles.optionTitle}>View:</span>
        {propertyViews.map((view) => (
          <div className={styles.formRow}>
            <label>
              <input
                key={view}
                type="checkbox"
                value={view}
                {...register("facilities.view", {
                  validate: (views) => {
                    if (!views || views.length < 1)
                      return "Select at least one view!";
                  },
                })}
              />
              {view}
            </label>
          </div>
        ))}
        <div className={styles.formRow}>
          <div></div>
          {errors.facilities?.view && (
            <span className={styles.error} style={{ color: "red" }}>
              {errors.facilities.view.message}
            </span>
          )}
        </div>

        <br />
        <br />

        <span className={styles.optionTitle}>Meal:</span>
        {propertyMeals.map((meal) => (
          <div className={styles.formRow}>
            <label>
              <input
                key={meal}
                type="checkbox"
                value={meal}
                {...register("facilities.meal", {
                  validate: (meals) => {
                    if (!meals || meals.length < 1)
                      return "Select at least one meal!";
                  },
                })}
              />
              {meal}
            </label>
          </div>
        ))}
        <div className={styles.formRow}>
          <div></div>
          {errors.facilities?.meal && (
            <span className={styles.error} style={{ color: "red" }}>
              {errors.facilities.meal.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilitiesSection;
