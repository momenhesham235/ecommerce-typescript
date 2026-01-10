import useRegister from "./useRegister";

import { Heading } from "@components/common";
import { Input } from "@components/forms";
import { Button, Form, Row, Col, Spinner, Alert } from "react-bootstrap";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formErrors,
    isValid,
    loading,
    error,
    submitHandler,
    emailAvailabilityStatus,
    emailOnBlurHandler,
  } = useRegister();

  return (
    <section>
      <Heading title="User Registration" />

      <Row className="my-2">
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Input
              label="First Name"
              name="firstName"
              register={register}
              error={formErrors.firstName?.message || ""}
              autoFocus
            />

            <Input
              label="Last Name"
              name="lastName"
              register={register}
              error={formErrors.lastName?.message || ""}
            />

            <Input
              label="Email Address"
              name="email"
              register={register}
              onBlur={emailOnBlurHandler}
              error={
                formErrors.email?.message
                  ? formErrors.email?.message
                  : emailAvailabilityStatus === "notAvailable"
                  ? "This email is already in use."
                  : emailAvailabilityStatus === "failed"
                  ? "Error from the server."
                  : ""
              }
              formText={
                emailAvailabilityStatus === "checking"
                  ? "We're currently checking the availability of this email address. Please wait a moment."
                  : ""
              }
              success={
                emailAvailabilityStatus === "available"
                  ? "This email is available for use."
                  : ""
              }
              disabled={emailAvailabilityStatus === "checking" ? true : false}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              error={formErrors.password?.message || ""}
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register}
              error={formErrors.confirmPassword?.message || ""}
            />

            <Button
              disabled={!isValid || loading === "pending"}
              variant="info"
              type="submit"
              style={{ color: "white" }}
            >
              {loading === "pending" ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Registering...</span>
                </>
              ) : (
                "Register"
              )}
            </Button>
            {error && <Alert variant="danger mt-2"> {error} </Alert>}
          </Form>
        </Col>
      </Row>
    </section>
  );
};

export default RegisterPage;
