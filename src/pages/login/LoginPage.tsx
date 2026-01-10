import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetAuthState } from "@store/auth/authSlice";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES, loginSchema, type TLoginType } from "@utils";

import { Heading } from "@components/common";
import { Input } from "@components/forms";
import { Button, Form, Row, Col, Alert, Spinner } from "react-bootstrap";

const LoginPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TLoginType>({
    mode: "onBlur",
    shouldFocusError: true,
    resolver: zodResolver(loginSchema),
  });

  const submitHandler: SubmitHandler<TLoginType> = (data) => {
    setSearchParams({});
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => navigate(ROUTES.HOME));
  };

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  return (
    <section>
      <Heading title="User Login" />

      <Row className="my-2">
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get("msg") && (
            <Alert variant="success">
              You need to be login to view this content, please login
            </Alert>
          )}
          {searchParams.get("msg") && (
            <Alert variant="success">
              You account has been created, please login{" "}
            </Alert>
          )}
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
              disabled={!isValid || loading === "pending"}
              variant="info"
              type="submit"
              style={{ color: "white" }}
            >
              {loading === "pending" ? (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Loading...</span>
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
