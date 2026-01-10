import { Outlet } from "react-router-dom";

import { Container } from "react-bootstrap";
import { Footer, Header } from "@components/common";

import styles from "./styles.module.css";
import { AuthModal } from "@components/auth";
const { container, wrapper } = styles;

const MainLayout = () => {
  return (
    <Container className={container}>
      {/* Header */}
      <Header />

      {/* Auth Modal */}
      <AuthModal />

      {/* Content */}
      <main className={wrapper}>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </Container>
  );
};

export default MainLayout;
