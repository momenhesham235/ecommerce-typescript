import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type TLoginType } from "@utils";

import { Heading } from "@components/common";
import { Input } from "@components/forms";
import { Button, Form, Row, Col } from "react-bootstrap";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TLoginType>({
    mode: "onBlur",
    shouldFocusError: true,
    resolver: zodResolver(loginSchema),
  });

  const submitHandler: SubmitHandler<TLoginType> = (data) => console.log(data);
  return (
    <section>
      <Heading title="User Login" />

      <Row className="my-2">
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Input
              label="Email"
              name="email"
              register={register}
              error={errors.email?.message || ""}
              autoFocus
            />

            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors.password?.message || ""}
            />

            <Button
              disabled={!isValid || isSubmitting}
              variant="info"
              type="submit"
              style={{ color: "white" }}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </Col>
      </Row>
    </section>
  );
};

export default LoginPage;
