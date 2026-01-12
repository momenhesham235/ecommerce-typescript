import { useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetAuthState } from "@store/auth/authSlice";
import { clearRedirectAfterLogin } from "@store/ui/uiSlice";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES, loginSchema, type TLoginType } from "@utils";

const useLogin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isValid },
  } = useForm<TLoginType>({
    mode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(loginSchema),
  });

  const redirectPath =
    (location.state as { redirect?: string })?.redirect || ROUTES.HOME;

  const submitHandler: SubmitHandler<TLoginType> = (data) => {
    setSearchParams({});
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => {
        dispatch(clearRedirectAfterLogin());
        navigate(redirectPath, { replace: true });
      });
  };

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  return {
    formErrors,
    isValid,
    loading,
    error,
    searchParams,
    register,
    handleSubmit,
    submitHandler,
  };
};

export default useLogin;
