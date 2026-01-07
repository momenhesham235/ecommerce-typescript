import { Link } from "react-router-dom";

import { LottieHandler } from "@components/feedback";
import { Container } from "react-bootstrap";

const Error = () => {
  return (
    <Container>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <LottieHandler type="notFound" />
        <Link to="/" replace={true}>
          How about going back to safety?
        </Link>
      </div>
    </Container>
  );
};

export default Error;
