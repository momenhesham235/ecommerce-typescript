import type { TLoadingStatus } from "@utils/types/shared";

interface ILoadingProps {
  loading: TLoadingStatus;
  error: string | null;
  children: React.ReactNode;
}

const Loading = ({ loading, error, children }: ILoadingProps) => {
  if (loading === "pending") {
    return <p>Loading...</p>;
  }

  if (loading === "failed") {
    return <p>{error}</p>;
  }

  return <>{children}</>;
};

export default Loading;
