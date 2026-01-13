import { Col, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@utils";

const ProfileLayoutSidebar = () => {
  return (
    <Col md={3}>
      <ListGroup>
        <ListGroup.Item as={NavLink} to="" end>
          Account Info
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to={`${ROUTES.PROFILE}/orders`}>
          Orders
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default ProfileLayoutSidebar;
