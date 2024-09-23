import { useEffect, useState } from "react";
import styles from "./roomForm.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import FacilitiesSection from "./FacilitiesSection";
import ImagesSection from "./ImagesSection";
import OthersSection from "./OthersSection";
import { RoomDTO } from "@repositories/RoomRepository";

type Props = {
  onSave: (roomFormData: FormData) => void;
  isLoading: boolean;
  room?: RoomDTO;
};

const RoomForm = ({ onSave, isLoading, room }: Props) => {
  const [toggleTab, setToggleTab] = useState(0);
  const formMethods = useForm<RoomDTO>();

  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(room);
  }, [room, reset]);

  const onSubmit = handleSubmit((formDataJson: RoomDTO) => {
    const formData = new FormData();

    if (room) formData.append("id", room._id);

    const isPropertyNullOrUndefined = formDataJson?.refTo?.property ?? null;
    const propertyValue = formDataJson.refTo.property;
    const assignValue =
      typeof propertyValue === "object" &&
      propertyValue !== null &&
      "_id" in propertyValue
        ? (propertyValue as { _id: string })._id.toString()
        : "";

    if (isPropertyNullOrUndefined)
      formData.append("refTo.property", assignValue);

    formData.append("name", formDataJson.name);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("roomSize", formDataJson.roomSize.toString());
    formData.append("noPhysicalRooms", formDataJson.noPhysicalRooms.toString());
    formData.append(
      "noAvailableRooms",
      formDataJson.noAvailableRooms.toString()
    );
    formData.append("roomStatus", formDataJson.roomStatus);
    formData.append("description", formDataJson.description);
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.room.forEach((room, index) => {
      formData.append(`facilities.room[${index}]`, room);
    });

    formDataJson.facilities.bathroom.forEach((bathroom, index) => {
      formData.append(`facilities.bathroom[${index}]`, bathroom);
    });

    formData.append("facilities.view", formDataJson.facilities.view);
    formData.append("facilities.meal", formDataJson.facilities.meal);

    formDataJson.facilities.bed.forEach((bed, index) => {
      formData.append(`facilities.bed[${index}]`, bed);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    // convert image files as array
    if (formDataJson.imageFiles) {
      Array.from(formDataJson.imageFiles).forEach((imageFile) => {
        formData.append("imageFiles", imageFile);
      });
    }

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <div className={styles.room}>
        <form onSubmit={onSubmit}>
          <div className={styles.card} style={{ paddingBlock: "1px" }}>
            <h2>{room?._id ? "Edit" : "Add"} Room</h2>
          </div>

          <div className={styles.cardCol}>
            <DetailsSection />

            <div className={styles.tabs}>
              <div className={styles.tabHeader}>
                <div
                  id="tab0"
                  className={
                    toggleTab === 0
                      ? `${styles.tab} ${styles.active}`
                      : `${styles.tab}`
                  }
                  onClick={() => setToggleTab(0)}
                >
                  Facilities
                </div>

                <div
                  id="tab1"
                  className={
                    toggleTab === 1
                      ? `${styles.tab} ${styles.active}`
                      : `${styles.tab}`
                  }
                  onClick={() => setToggleTab(1)}
                >
                  Others
                </div>
              </div>
              <div className={styles.tabBody}>
                <div
                  className={
                    toggleTab === 0
                      ? `${styles.showTabContent}`
                      : `${styles.hideTabContent}`
                  }
                >
                  <FacilitiesSection />
                </div>

                <div
                  className={
                    toggleTab === 1
                      ? `${styles.showTabContent}`
                      : `${styles.hideTabContent}`
                  }
                >
                  <OthersSection />
                </div>
              </div>
            </div>
          </div>

          <ImagesSection />

          <div className={styles.formButton}>
            <button
              type="submit"
              className={styles.buttonSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>

            {/* {room && isBookingDataEmpty(room, "bookingData") ? (
              <strong>
                Sorry, as of now updating room when it has already been booked
                is disabled.
              </strong>
            ) : (
              <button
                type="submit"
                className={styles.buttonSave}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            )} */}
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default RoomForm;
