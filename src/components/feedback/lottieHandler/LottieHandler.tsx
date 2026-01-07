import Lottie from "lottie-react";
import { notFound, loading, error, empty } from "@assets";

const lottieTypes = { notFound, loading, error, empty };
import style from "./style.module.css";
const { animationLottie } = style;

type TLottieHandlerProps = {
  type: keyof typeof lottieTypes;
  message?: string;
};

const LottieHandler = ({ type, message }: TLottieHandlerProps) => {
  const lottie = lottieTypes[type];
  const messageClass = type === "error" ? "text-danger" : "text-primary";

  return (
    <section className="d-flex flex-column align-items-center px-3">
      <Lottie animationData={lottie} className={animationLottie} />

      {message && (
        <h4 className={`text-center mt-3 fw-bold ${messageClass}`}>
          {message}
        </h4>
      )}
    </section>
  );
};

export default LottieHandler;
