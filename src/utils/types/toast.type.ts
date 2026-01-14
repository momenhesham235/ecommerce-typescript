export type TToast = {
  id?: string;
  title: string;
  type: "success" | "danger" | "primary" | "warning";
  message: string;
  delayAnimation?: boolean;
  onCloseToast?: () => void;
};
