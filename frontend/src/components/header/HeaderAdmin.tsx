import { Link } from "react-router-dom";
import styles from "./header.module.scss";

const HeaderAdmin = () => {
  return (
    <div className={styles.header}>
      <div>
        <span>
          <Link className={styles.title} to="/">
            Booking.com
          </Link>
        </span>
      </div>

      <div className={styles.items}></div>
    </div>
  );
};

export default HeaderAdmin;
