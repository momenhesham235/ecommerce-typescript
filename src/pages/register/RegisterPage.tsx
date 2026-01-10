import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister, resetAuthState } from "@store/auth/authSlice";
import { useNavigate } from "react-router-dom";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";

import { Heading } from "@components/common";
import { Input } from "@components/forms";
import { Button, Form, Row, Col, Spinner, Alert } from "react-bootstrap";
import { registerSchema, ROUTES, type TRegisterType } from "@utils";

const RegisterPage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    checkEmailAvailability,
    emailAvailabilityStatus,
    prevEnteredEmail,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability();

  const {
    register,
    handleSubmit,
    trigger,
    getFieldState,
    formState: { errors, isValid },
  } = useForm<TRegisterType>({
    mode: "onBlur",
    shouldFocusError: true,
    resolver: zodResolver(registerSchema),
  });

  const submitHandler: SubmitHandler<TRegisterType> = async (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => navigate(`${ROUTES.LOGIN}?msg=registration_successful`));
  };

  const emailOnBlurHandler = async (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    await trigger("email");
    const value = event.target.value;
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && value !== prevEnteredEmail) {
      checkEmailAvailability(value);
    }

    if (isDirty && invalid && prevEnteredEmail) {
      resetCheckEmailAvailability();
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

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
              error={errors.firstName?.message || ""}
              autoFocus
            />

            <Input
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName?.message || ""}
            />

            <Input
              label="Email Address"
              name="email"
              register={register}
              onBlur={emailOnBlurHandler}
              error={
                errors.email?.message
                  ? errors.email?.message
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
              error={errors.password?.message || ""}
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register}
              error={errors.confirmPassword?.message || ""}
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
