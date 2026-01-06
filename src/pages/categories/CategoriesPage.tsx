import useCategoriesPage from "./useCategoriesPage";

import { GridList, Heading } from "@components/common";
import { Loading } from "@components/feedback";
import { Category } from "@components/eCommerce";

import { Container } from "react-bootstrap";
import type { TCategory } from "@utils/types/category";

const CategoriesPage = () => {
  const { records, loading, error } = useCategoriesPage();

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
