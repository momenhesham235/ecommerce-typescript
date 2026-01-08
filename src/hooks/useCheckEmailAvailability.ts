import { useState } from "react";
import axios from "axios";

type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";

const useCheckEmailAvailability = () => {
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] =
    useState<TStatus>("idle");

  const [prevEnteredEmail, setPrevEnteredEmail] = useState<null | string>(null);

  const checkEmailAvailability = async (email: string) => {
    setPrevEnteredEmail(email);
    setEmailAvailabilityStatus("checking");

    try {
      const response = await axios.get<{ email: string }[]>(
        `/users?email=${email}`
      );

      if (!response.data.length) {
        setEmailAvailabilityStatus("available");
      } else {
        setEmailAvailabilityStatus("notAvailable");
      }
    } catch (error) {
      setEmailAvailabilityStatus("failed");
      console.log(error);
    }
  };

  const resetCheckEmailAvailability = () => {
    setEmailAvailabilityStatus("idle");
    setPrevEnteredEmail(null);
  };

  return {
    emailAvailabilityStatus,
    checkEmailAvailability,
    resetCheckEmailAvailability,
    prevEnteredEmail,
  };
};

export default useCheckEmailAvailability;
