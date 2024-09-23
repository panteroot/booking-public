import styles from "./sidebar.module.scss";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation().pathname;
  const regexForProperties = /\/admin\/properties/;
  const regexForRooms = /\/admin\/rooms/;
  const regexForBookings = /\/admin\/bookings/;
  let locationActive = "";

  if (regexForProperties.test(location)) {
    locationActive = "properties";
  } else if (regexForRooms.test(location)) {
    locationActive = "rooms";
  } else if (regexForBookings.test(location)) {
    locationActive = "bookings";
  } else {
    locationActive = "dashboard";
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarCol}>
        <div className={styles.logoRow}>Booking.com</div>

        <ul className={styles.menu}>
          <p className={styles.title}>MAIN</p>
          <li
            className={
              locationActive === "dashboard"
                ? `${styles.menuSubItem} ${styles.menuSubItemActive}`
                : `${styles.menuSubItem}`
            }
          >
            <NavLink className={styles.navLink} to="/admin/dashboard">
              Dashboard
            </NavLink>
          </li>

          <p className={styles.title}>LIST</p>
          <li
            className={
              locationActive === "properties"
                ? `${styles.menuSubItem} ${styles.menuSubItemActive}`
                : `${styles.menuSubItem}`
            }
          >
            <NavLink
              to="/admin/properties"
              className={styles.navLink}
              // className={({ isActive }) =>
              //   isActive
              //     ? `${styles.navLink} ${styles.navLinkActive}`
              //     : `${styles.navLink}`
              // }
            >
              Property
            </NavLink>
          </li>

          <li
            className={
              locationActive === "rooms"
                ? `${styles.menuSubItem} ${styles.menuSubItemActive}`
                : `${styles.menuSubItem}`
            }
          >
            <NavLink className={styles.navLink} to="/admin/rooms">
              Room
            </NavLink>
          </li>
          {/* <li
            className={
              locationActive === "bookings"
                ? `${styles.menuSubItem} ${styles.menuSubItemActive}`
                : `${styles.menuSubItem}`
            }
          >
            <NavLink className={styles.navLink} to="/admin/bookings">
              Booking
            </NavLink>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
