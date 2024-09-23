import styles from "./header.module.scss";
import Signout from "./Signout";
const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerRow}>
        <span>Howdy Admin!</span>
        <Signout />
      </div>
    </div>
  );
};

export default Header;
