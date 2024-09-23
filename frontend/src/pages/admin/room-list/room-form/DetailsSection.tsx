import styles from "./roomForm.module.scss";
import { useFormContext } from "react-hook-form";
import { RoomDTO } from "@repositories/RoomRepository";
import { useQueryGetPropertiesForRHF } from "@hooks/useProperty";
import SearchableSelectInSubForm from "@components/admin/SearchableSelectInSubForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext<RoomDTO>();

  const roomTypes = [
    "Presidential Suite",
    "Junior Suite",
    "Family Room",
    "Deluxe Double Room",
    "Deluxe Twin Room",
    "Standard Double Room",
    "Standard Twin Room",
    "N/A",
  ];

  const room = getValues();

  const {
    data: properties = [],
    isLoading,
    isError,
    error,
  } = useQueryGetPropertiesForRHF();

  const isBookingDataEmpty = (obj: RoomDTO, key: keyof RoomDTO): boolean =>
    obj[key] === undefined ||
    obj[key] === null ||
    (typeof obj[key] === "string" && obj[key].trim() === "") ||
    (Array.isArray(obj[key]) && obj[key].length === 0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...{(error as Error).message}</div>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <span>Room Details</span>
      </div>

      <div className={styles.form}>
        {/* <SelectProperty /> */}

        <div className={styles.formRow}>
          <label>Name</label>
          <input
            type="text"
            {...register("name", {
              required: "This field is required!",
            })}
            readOnly={
              room && !isBookingDataEmpty(room, "bookingData") ? true : false
            }
            style={
              room && !isBookingDataEmpty(room, "bookingData")
                ? {
                    background: "#d3d3d3",
                    cursor: "not-allowed",
                  }
                : {}
            }
          />
        </div>

        <div className={styles.formRow}>
          <div></div>
          {errors.name && (
            <span className={styles.error}> {errors.name.message}</span>
          )}
        </div>

        <div className={styles.formRow}>
          <label>Property</label>

          {room && isBookingDataEmpty(room, "bookingData") ? (
            <SearchableSelectInSubForm
              name="refTo.property"
              options={properties}
            />
          ) : (
            <input
              type="text"
              readOnly
              value={room.refTo.property.name}
              style={{
                background: "#d3d3d3",
                cursor: "not-allowed",
              }}
            />
          )}
        </div>

        <div className={styles.formRow}>
          <div></div>
          {errors.refTo?.property && (
            <span className={styles.error}>
              {errors.refTo?.property.message}
            </span>
          )}
        </div>

        <div className={styles.formRow}>
          <label>Type</label>
          {room && isBookingDataEmpty(room, "bookingData") ? (
            <select
              {...register("type", {
                required: "This field is required!",
              })}
            >
              <option value="" selected>
                Select Type
              </option>
              {roomTypes.map((type) => (
                <option value={type}>{type}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              {...register("type")}
              value={room.type}
              readOnly
              style={{
                background: "#d3d3d3",
                cursor: "not-allowed",
              }}
            />
          )}
        </div>
        <div className={styles.formRow}>
          <div></div>
          {errors.type && (
            <span className={styles.error}> {errors.type.message}</span>
          )}
        </div>

        <div className={styles.formRow}>
          <label>Price per night</label>
          <input
            type="number"
            min={500}
            {...register("pricePerNight", {
              required: "This field is required!",
            })}
            readOnly={
              room && !isBookingDataEmpty(room, "bookingData") ? true : false
            }
            style={
              room && !isBookingDataEmpty(room, "bookingData")
                ? {
                    background: "#d3d3d3",
                    cursor: "not-allowed",
                  }
                : {}
            }
          />
        </div>
        <div className={styles.formRow}>
          <div></div>
          {errors.pricePerNight && (
            <span className={styles.error}>{errors.pricePerNight.message}</span>
          )}
        </div>

        <div className={styles.formRow}>
          <label>Room Size (sqm)</label>
          <input
            type="text"
            {...register("roomSize", {
              required: "This field is required!",
            })}
          />
        </div>
        <div className={styles.formRow}>
          <div></div>
          {errors.roomSize && (
            <span className={styles.error}> {errors.roomSize.message}</span>
          )}
        </div>

        <div className={styles.formRow}>
          <label>Physical Rooms</label>
          <input
            type="number"
            {...register("noPhysicalRooms", {
              required: "This field is required!",
            })}
            readOnly={
              room && !isBookingDataEmpty(room, "bookingData") ? true : false
            }
            style={
              room && !isBookingDataEmpty(room, "bookingData")
                ? {
                    background: "#d3d3d3",
                    cursor: "not-allowed",
                  }
                : {}
            }
          />
        </div>
        <div className={styles.formRow}>
          <div></div>
          {errors.noPhysicalRooms && (
            <span className={styles.error}>
              {errors.noPhysicalRooms.message}
            </span>
          )}
        </div>

        <div className={styles.formRow}>
          <label>Available Rooms</label>
          <input
            type="number"
            {...register("noAvailableRooms", {
              required: "This field is required!",
            })}
            readOnly={
              room && !isBookingDataEmpty(room, "bookingData") ? true : false
            }
            style={
              room && !isBookingDataEmpty(room, "bookingData")
                ? {
                    background: "#d3d3d3",
                    cursor: "not-allowed",
                  }
                : {}
            }
          />
        </div>
        <div className={styles.formRow}>
          <div></div>
          {errors.noAvailableRooms && (
            <span className={styles.error}>
              {errors.noAvailableRooms.message}
            </span>
          )}
        </div>

        {/* <div className={styles.formRow}>
          <label>Room Status</label>
          <select
            {...register("roomStatus", {
              required: "This field is required!",
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
          {errors.roomStatus && (
            <span className={styles.error}>{errors.roomStatus.message}</span>
          )}
        </div> */}

        <div className={styles.formRow}>
          <label>Description</label>
          <textarea
            rows={4}
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

        {room && !isBookingDataEmpty(room, "bookingData") && (
          <p>
            Apologies, but currently, certain room details are{" "}
            <strong> disabled if the room has already been booked</strong>, as
            the dev haven't yet defined the business rules for handling updates
            in this situation.
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailsSection;
