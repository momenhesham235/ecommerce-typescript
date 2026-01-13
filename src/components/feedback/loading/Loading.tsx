import {
  CategorySkeleton,
  ProductSkeleton,
  CartSkeleton,
  TableSkeleton,
} from "@components/feedback/skeletons";
import { LottieHandler } from "@components/feedback";
import type { TLoadingStatus } from "@utils";

const skeletonsTypes = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
  table: TableSkeleton,
};

interface ILoadingProps {
  loading: TLoadingStatus;
  error: string | null;
  children: React.ReactNode;
  type: keyof typeof skeletonsTypes;
}

const Loading = ({ loading, error, children, type }: ILoadingProps) => {
  if (loading === "pending") {
    const SkeletonComponent = skeletonsTypes[type];

    return <SkeletonComponent />;
  }

  if (loading === "failed") {
    return (
      <div>
        <LottieHandler type="error" message={error as string} />
      </div>
    );
  }

  return <>{children}</>;
};

export default Loading;
