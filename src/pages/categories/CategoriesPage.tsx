import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { Category } from "@components/eCommerce";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
const CategoriesPage = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);

  useEffect(() => {
    if (!categories.length) {
      dispatch(actGetCategories());
    }
  }, [dispatch, categories]);

  const categoriesList =
    categories.length > 0
      ? categories.map((cat) => (
          <Col
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
            key={cat.id}
          >
            <Category {...cat} />
          </Col>
        ))
      : "there are no categories";

  return (
    <Container>
      <Row>{categoriesList}</Row>
    </Container>
  );
};

export default CategoriesPage;
