import styles from "./styles.module.css";
const { footerContainer } = styles;

const Footer = () => {
  return (
    <div className={footerContainer}>
      © {new Date().getFullYear()} Our Company. All rights reserved.
    </div>
  );
};

export default Footer;
