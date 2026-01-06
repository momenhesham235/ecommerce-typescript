import { Link } from "react-router-dom";
import useErrorBoundary from "./useErrorBoundary";
import { Container } from "react-bootstrap";

const Error = () => {
  const { errorStatus, errorStatusText } = useErrorBoundary();
  return (
    <Container className="notFound">
      <h1>{errorStatus}</h1>
      <p>{errorStatusText}</p>
      <Link to="/" replace={true}>
        How about going back to safety?
      </Link>
    </Container>
  );
};

export default Error;
