import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetCategories } from "@store/categories/categoriesSlice";

import { Container } from "react-bootstrap";
import { GridList, Heading } from "@components/common";
import { Category } from "@components/eCommerce";
import { Loading } from "@components/feedback";

const CategoriesPage = () => {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (!categories.length) {
      dispatch(actGetCategories());
    }
  }, [dispatch, categories]);

  return (
    <Container>
      <Heading>Categories</Heading>
      <Loading loading={loading} error={error}>
        <GridList
          records={categories}
          renderItem={(cat) => <Category {...cat} />}
        />
      </Loading>
    </Container>
  );
};

export default CategoriesPage;
