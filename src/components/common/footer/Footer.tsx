import styles from "./styles.module.css";
const { footerContainer } = styles;

const Footer = () => {
  return (
    <footer className={footerContainer}>
      © {new Date().getFullYear()} Our Company. All rights reserved.
    </footer>
  );
};

export default Footer;
