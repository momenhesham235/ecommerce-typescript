import { useAppDispatch, useAppSelector } from "@store/hooks";
import { openAuthModal } from "@store/ui/uiSlice";
import { useLocation } from "react-router-dom";

export const useAuthAction = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const location = useLocation();

  const requireAuth = (action: () => void) => {
    if (!accessToken) {
      dispatch(openAuthModal(location.pathname));
      return;
    }

    action();
  };

  return { requireAuth };
};

// ✔ يمسك المكان الحالي
// ✔ لو مفيش accessToken يفتح Auth Modal
// ✔ ويخزن redirectAfterLogin
