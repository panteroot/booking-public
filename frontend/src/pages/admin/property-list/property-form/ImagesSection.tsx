import styles from "./propertyForm.module.scss";
import { useFormContext } from "react-hook-form";
import { PropertyDTO } from "@repositories/PropertyRepository";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<PropertyDTO>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    imageUrl: string
  ) => {
    e.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  const imagesSection: React.CSSProperties = {
    display: "flex",
    overflowX: "auto",
    whiteSpace: "nowrap",
    padding: "5px",
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <span>Property Images</span>
      </div>

      <div className={styles.form}>
        <div className={styles.formRow} style={imagesSection}>
          {existingImageUrls && (
            <div className={styles.imageContainer}>
              {existingImageUrls.map((url) => (
                <div className={styles.imageWrapper}>
                  <img className={styles.image} src={url} />
                  <button
                    className={styles.btnDelete}
                    onClick={(e) => handleDelete(e, url)}
                  >
                    Delete image
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.formRow}>
          <input
            type="file"
            multiple
            accept="image/*"
            {...register("imageFiles", {
              validate: (imageFiles) => {
                const totalLength =
                  (imageFiles?.length || 0) + (existingImageUrls?.length || 0);

                if (totalLength < 7) return "Pls add at least 7 images!";
                else if (totalLength > 10)
                  return "You can only add up to 10 images!";
                return true;
              },
            })}
          />
        </div>
        <div className={styles.formRow}>
          {errors.imageFiles && (
            <span className={styles.error}> {errors.imageFiles.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagesSection;
