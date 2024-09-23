import styles from "./propertyForm.module.scss";
import { useFormContext } from "react-hook-form";
import { PropertyDTO } from "@repositories/PropertyRepository";
import SearchableSelectInSubForm from "@components/admin/SearchableSelectInSubForm";
import { useQueryGetCitiesByCountry } from "../useProperty";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PropertyDTO>();

  // const {
  //   data: countries = [],
  //   isLoading: isLoadingCountries,
  //   isError: isErrorCountries,
  //   error: errorCountries,
  // } = useQueryGetCountries();

  const {
    data: cities = [],
    isLoading: isLoadingCities,
    isError: isErrorCities,
    error: errorCities,
  } = useQueryGetCitiesByCountry("Philippines");

  if (isLoadingCities) {
    return <div>Loading...</div>;
  }

  if (isErrorCities) {
    return <div>Error...{(errorCities as Error).message}</div>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <span>Property Details</span>
      </div>

      <div className={styles.form}>
        <div className={styles.formRow}>
          <label>Name</label>
          <input
            type="text"
            {...register("name", {
              required: "This field is required!",
            })}
          />
        </div>
        <div className={styles.formRow}>
          <div></div>
          {errors.name && (
            <span className={styles.error}> {errors.name.message}</span>
          )}
        </div>

        <div className={styles.formRow}>
          <label>Property Type</label>
          <select
            className={styles.detailsSelect}
            {...register("propertyType", {
              required: "This field is required!",
            })}
          >
            <option value="" selected>
              Select Type
            </option>
            {["Hotel", "Apartment", "Condo"].map((type) => (
              <option value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className={styles.formRow}>
          <div></div>
          {errors.propertyType && (
            <span className={styles.error}>{errors.propertyType.message}</span>
          )}
        </div>

        <div className={styles.formRow}>
          <label>Property Status</label>
          <select
            className={styles.detailsSelect}
            {...register("propertyStatus", {
              required: "This field is required!!",
            })}
          >
            <option value="" selected>
              Select Status
            </option>
            {["Active", "Inactive"].map((status) => (
              <option value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className={styles.formRow}>
          <div></div>
          {errors.propertyStatus && (
            <span className={styles.error}>
              {errors.propertyStatus.message}
            </span>
          )}
        </div>

        <div className={styles.formRow}>
          <label>Address</label>
          <input
            type="text"
            {...register("address", {
              required: "This field is required!",
            })}
          />
        </div>
        <div className={styles.formRow}>
          <div></div>
          {errors.address && (
            <span className={styles.error}> {errors.address.message}</span>
          )}
        </div>

        <div className={styles.formRow}>
          <label>Country</label>
          {/* Working: For future updates. */}
          {/* <SearchableSelectInSubForm name="country" options={countries} /> */}
          <input
            style={{
              background: "#d3d3d3",
              cursor: "not-allowed",
            }}
            type="text"
            {...register("country", {
              // required: "This field is required!",
            })}
            value="Philippines"
            readOnly
          />
        </div>
        <div className={styles.formRow}>
          <div></div>
          {errors.country && (
            <span className={styles.error}> {errors.country.message}</span>
          )}
        </div>

        <div className={styles.formRow}>
          <label>City</label>
          <SearchableSelectInSubForm name="city" options={cities} />
        </div>
        <div className={styles.formRow}>
          <div></div>
          {errors.city && (
            <span className={styles.error}> {errors.city.message}</span>
          )}
        </div>

        <div className={styles.formRow}>
          <label>Description</label>
          <textarea
            rows={5}
            {...register("description", {
              required: "This field is required!",
            })}
          ></textarea>
        </div>
        <div className={styles.formRow}>
          <div></div>
          {errors.description && (
            <span className={styles.error}> {errors.description.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
