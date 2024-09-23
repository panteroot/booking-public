import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerRow}>
        <span>Copyright @2024.</span>
      </div>
    </div>
  );
};

export default Footer;
