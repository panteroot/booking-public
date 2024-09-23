import { Link } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";
import styles from "./header.module.scss";
import Signout from "./Signout";
import React from "react";

// memoized so this won't rerender when user is in Registration page
// since js uses singleton pattern of UserRepo instance (because of module caching),
// it somehow assigns this.endpoint="me"
// so when user try to submit registration form, it points to "users/me" post request
// assigning this.endpoint="" is not sufficient as Header will still rerender since it is part of
// Layout w/c is a parent of RegistrationForm component
const Header = React.memo(() => {
  const { isLoggedIn, name, userType } = useAuthContext();

  return (
    <div className={styles.header}>
      <div>
        <span>
          <Link className={styles.title} to="/">
            Booking.com
          </Link>
        </span>
      </div>

      <div className={styles.items}>
        {isLoggedIn && userType === "USER" ? (
          <>
            <Link className={styles.link} to="/my-bookings">
              My Bookings
            </Link>
            |<span>Howdy {name}!</span>
            <Signout />
          </>
        ) : (
          <>
            <Link className={styles.link} to="/users/register">
              <button className={styles.button}>Register</button>
            </Link>
            <Link className={styles.link} to="/login">
              <button className={styles.button}>Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
});

export default Header;
