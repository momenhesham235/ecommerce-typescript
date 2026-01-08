import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type TRegisterType } from "@utils";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";

import { Heading } from "@components/common";
import { Input } from "@components/forms";
import { Button, Form, Row, Col } from "react-bootstrap";

const RegisterPage = () => {
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
    formState: { errors, isValid, isSubmitting },
  } = useForm<TRegisterType>({
    mode: "onBlur",
    shouldFocusError: true,
    resolver: zodResolver(registerSchema),
  });

  const submitHandler: SubmitHandler<TRegisterType> = (data) =>
    console.log(data);

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
              disabled={!isValid || isSubmitting}
              variant="info"
              type="submit"
              style={{ color: "white" }}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </Form>
        </Col>
      </Row>
    </section>
  );
};

export default RegisterPage;
