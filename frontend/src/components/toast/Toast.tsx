import { useEffect } from "react";
import styles from "./toast.module.scss";

type Props = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className={styles.toast}>
      <div
        className={styles.toastContainer}
        style={
          type === "SUCCESS"
            ? { backgroundColor: "green" }
            : { backgroundColor: "red" }
        }
      >
        <div>{message}</div>
        <div className={styles.closeIcon}>
          <span onClick={onClose}>&times;</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
