import styles from "./roomForm.module.scss";
import { useFormContext } from "react-hook-form";
import { RoomDTO } from "@repositories/RoomRepository";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<RoomDTO>();

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
        <span>Room Images</span>
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

                if (totalLength < 4) return "Pls add at least 4 images!";
                else if (totalLength > 8)
                  return "You can only add up to 8 images!";
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
