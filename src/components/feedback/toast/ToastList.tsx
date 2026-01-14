import ToastItem from "./ToastItem";
import { useAppSelector } from "@store/hooks";

import styles from "./styles.module.css";
const { toastList } = styles;

const ToastList = () => {
  const { records } = useAppSelector((state) => state.toasts);

  return (
    <div className={toastList}>
      {records.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastList;
