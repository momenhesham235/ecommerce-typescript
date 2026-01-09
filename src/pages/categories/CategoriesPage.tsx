import useCategoriesPage from "./useCategoriesPage";

import { GridList, Heading } from "@components/common";
import { Loading } from "@components/feedback";
import { Category } from "@components/eCommerce";

import { Container } from "react-bootstrap";
import type { TCategory } from "@utils";

const CategoriesPage = () => {
  const { records, loading, error } = useCategoriesPage();

 

  return (
    <Container>
      <Heading title="Categories" />
      <Loading loading={loading} error={error} type="category">
        <GridList<TCategory>
          records={records}
          renderItem={(cat) => <Category key={cat.id} {...cat} />}
          emptyMessage="Your category list is empty"
        />
      </Loading>
    </Container>
  );
};

export default CategoriesPage;
