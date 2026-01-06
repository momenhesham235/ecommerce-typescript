import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetCategories,
  categoriesCleanUp,
} from "@store/categories/categoriesSlice";

import { Container } from "react-bootstrap";
import { GridList, Heading } from "@components/common";
import { Category } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import type { TCategory } from "@utils/types/category";

const CategoriesPage = () => {
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

  return (
    <Container>
      <Heading title="Categories" />
      <Loading loading={loading} error={error}>
        <GridList<TCategory>
          records={records}
          renderItem={(cat) => <Category key={cat.id} {...cat} />}
        />
      </Loading>
    </Container>
  );
};

export default CategoriesPage;
