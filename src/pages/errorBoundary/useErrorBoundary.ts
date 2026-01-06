import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const useErrorBoundary = () => {
  const error = useRouteError();
  let errorStatus: number;
  let errorStatusText: string;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorStatusText = error.statusText;
  } else {
    errorStatus = 404;
    errorStatusText = "Page Not Found";
  }
  return { errorStatus, errorStatusText };
};

export default useErrorBoundary;
