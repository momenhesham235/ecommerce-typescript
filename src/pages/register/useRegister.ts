import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister, resetAuthState } from "@store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { registerSchema, ROUTES, type TRegisterType } from "@utils";

const useRegister = () => {
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
    formState: { errors: formErrors, isValid },
  } = useForm<TRegisterType>({
    mode: "onChange",
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

  return {
    loading,
    error,
    emailAvailabilityStatus,
    formErrors,
    isValid,
    register,
    handleSubmit,
    submitHandler,
    emailOnBlurHandler,
  };
};

export default useRegister;
