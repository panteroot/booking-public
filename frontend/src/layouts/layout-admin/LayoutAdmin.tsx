import Header from "@components/admin/header/Header";
import Sidebar from "@components/admin/sidebar/Sidebar";
import styles from "./layoutAdmin.module.scss";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const LayoutAdmin = React.memo(({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <div className={styles.leftContainer}>
        <Sidebar />
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.headerWrapper}>
          <Header />
        </div>

        <div className={styles.contentWrapper}>{children}</div>

        {/* <div className={styles.footerWrapper}>
          <Footer />
        </div> */}
      </div>
    </div>
  );
});

export default LayoutAdmin;
