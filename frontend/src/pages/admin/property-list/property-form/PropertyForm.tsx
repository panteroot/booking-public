import { useState } from "react";
import styles from "./propertyForm.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import FacilitiesSection from "./FacilitiesSection";
import RoomsSection from "./RoomsSection";
import RulesSection from "./RulesSection";
import ImagesSection from "./ImagesSection";
import { useEffect } from "react";
import { PropertyDTO } from "@repositories/PropertyRepository";
import MapSection from "./MapSection";

type Props = {
  onSave: (properyFormData: FormData) => void;
  isLoading: boolean;
  property?: PropertyDTO;
};

const PropertyForm = ({ onSave, isLoading, property }: Props) => {
  const [toggleTab, setToggleTab] = useState(0);
  const formMethods = useForm<PropertyDTO>({
    defaultValues: {
      city: "", // Default value
    },
  });
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(property);
  }, [property, reset]);

  const onSubmit = handleSubmit((formDataJson: PropertyDTO) => {
    const formData = new FormData();

    if (property) formData.append("id", property._id);

    formData.append("name", formDataJson.name);
    formData.append("propertyType", formDataJson.propertyType);
    formData.append("address", formDataJson.address);
    formData.append("country", formDataJson.country);

    formData.append("city", formDataJson.city);
    formData.append("description", formDataJson.description);
    formData.append(
      "totalPhysicalRooms",
      formDataJson.totalPhysicalRooms.toString()
    );
    formData.append(
      "totalAvailableRooms",
      formDataJson.totalAvailableRooms.toString()
    );
    formData.append("propertyStatus", formDataJson.propertyStatus);

    formDataJson.featuredFacilities.forEach((facility, index) => {
      formData.append(`featuredFacilities[${index}]`, facility);
    });

    formDataJson.facilities.property.forEach((facility, index) => {
      formData.append(`facilities.property[${index}]`, facility);
    });

    formDataJson.facilities.view.forEach((view, index) => {
      formData.append(`facilities.view[${index}]`, view);
    });

    formDataJson.facilities.meal.forEach((meal, index) => {
      formData.append(`facilities.meal[${index}]`, meal);
    });

    formData.append("rules.checkin", formDataJson.rules.checkin);
    formData.append("rules.checkout", formDataJson.rules.checkout);
    formData.append(
      "rules.damageDepositFee",
      formDataJson.rules.damageDepositFee
    );
    formData.append("rules.pet", formDataJson.rules.pet);
    formData.append("rules.others", formDataJson.rules.others);

    // getting latitude and longitude
    if (formDataJson.position) {
      const positionArr = formDataJson.position.split(",");
      formData.append("latitude", parseFloat(positionArr[0]).toString());
      formData.append("longitude", positionArr[1]);
    }

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

    // To verify what’s in formData (for debugging)
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <div className={styles.property}>
        <form onSubmit={onSubmit}>
          <div className={styles.card} style={{ paddingBlock: "1px" }}>
            <h2>{property?._id ? "Edit" : "Add"} Property</h2>
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
                  Rules
                </div>
                <div
                  id="tab2"
                  className={
                    toggleTab === 2
                      ? `${styles.tab} ${styles.active}`
                      : `${styles.tab}`
                  }
                  onClick={() => setToggleTab(2)}
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
                  <RulesSection />
                </div>

                <div
                  className={
                    toggleTab === 2
                      ? `${styles.showTabContent}`
                      : `${styles.hideTabContent}`
                  }
                >
                  <RoomsSection />
                </div>
              </div>
            </div>
          </div>

          <MapSection />

          <ImagesSection />
          <div className={styles.formButton}>
            <button
              type="submit"
              className={styles.buttonSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default PropertyForm;
