import useLogin from "./useLogin";

import { Heading } from "@components/common";
import { Input } from "@components/forms";
import { Button, Form, Row, Col, Alert, Spinner } from "react-bootstrap";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formErrors,
    isValid,
    loading,
    error,
    submitHandler,
    searchParams,
  } = useLogin();

  return (
    <section>
      <Heading title="User Login" />

      <Row className="my-2">
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get("msg") === "login_required" && (
            <Alert variant="success">
              You need to be login to view this content, please login
            </Alert>
          )}
          {searchParams.get("msg") === "registration_successful" && (
            <Alert variant="success">
              You account has been created, please login{" "}
            </Alert>
          )}
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Input
              label="Email"
              name="email"
              register={register}
              error={formErrors.email?.message || ""}
              autoFocus
            />

            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              error={formErrors.password?.message || ""}
            />

            <Button
              disabled={!isValid || loading === "pending"}
              variant="info"
              type="submit"
              style={{ color: "white" }}
            >
              {loading === "pending" ? (
                <>
                  <Spinner as="span" animation="grow" size="sm" /> loading.....
                </>
              ) : (
                "Login"
              )}
            </Button>

            {error && <Alert variant="danger mt-2"> {error} </Alert>}
          </Form>
        </Col>
      </Row>
    </section>
  );
};

export default LoginPage;
