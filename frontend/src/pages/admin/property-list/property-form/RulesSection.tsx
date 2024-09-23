import styles from "./propertyForm.module.scss";
import { useFormContext } from "react-hook-form";
import { PropertyDTO } from "@repositories/PropertyRepository";

const RulesSection = () => {
  const {
    register,

    formState: { errors },
  } = useFormContext<PropertyDTO>();

  return (
    <div className={styles.form}>
      <div className={styles.formRow}>
        <label>Check-in</label>
        <input
          type="text"
          {...register("rules.checkin", {
            required: "This field is required!",
          })}
        />
      </div>
      <div className={styles.formRow}>
        <div></div>
        {errors.rules?.checkin && (
          <span className={styles.error}> {errors.rules.checkin.message}</span>
        )}
      </div>

      <div className={styles.formRow}>
        <label>Check-out</label>
        <input
          type="text"
          {...register("rules.checkout", {
            required: "This field is required!",
          })}
        />
      </div>
      <div className={styles.formRow}>
        <div></div>
        {errors.rules?.checkout && (
          <span className={styles.error}> {errors.rules.checkout.message}</span>
        )}
      </div>

      <div className={styles.formRow}>
        <label>Damage</label>
        <input
          type="text"
          placeholder="Refundable damage deposit"
          {...register("rules.damageDepositFee", {
            required: "This field is required!",
          })}
        />
      </div>
      <div className={styles.formRow}>
        <div></div>
        {errors.rules?.damageDepositFee && (
          <span className={styles.error}>
            {errors.rules.damageDepositFee.message}
          </span>
        )}
      </div>

      <div className={styles.formRow}>
        <label>Pets</label>
        <input
          type="text"
          {...register("rules.pet", {
            required: "This field is required!",
          })}
        />
      </div>
      <div className={styles.formRow}>
        <div></div>
        {errors.rules?.pet && (
          <span className={styles.error}> {errors.rules.pet.message}</span>
        )}
      </div>

      <div className={styles.formRow}>
        <label>Others</label>
        <textarea
          rows={5}
          cols={20}
          {...register("rules.others", {
            required: "This field is required!",
          })}
        ></textarea>
      </div>
      <div className={styles.formRow}>
        <div></div>
        {errors.rules?.others && (
          <span className={styles.error}> {errors.rules.others.message}</span>
        )}
      </div>
    </div>
  );
};

export default RulesSection;
