import { ProfileLayoutSidebar } from "@components/common";
import { Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <Row>
      <ProfileLayoutSidebar />
      <Col>
        <Outlet />
      </Col>
    </Row>
  );
};

export default ProfileLayout;
