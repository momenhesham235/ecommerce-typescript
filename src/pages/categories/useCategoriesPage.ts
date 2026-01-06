import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetCategories,
  categoriesCleanUp,
} from "@store/categories/categoriesSlice";

const useCategoriesPage = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(actGetCategories());

    return () => {
      dispatch(categoriesCleanUp());
    };
  }, [dispatch]);
  return { records, loading, error };
};

export default useCategoriesPage;
