import { Row, Col } from "react-bootstrap";

type TGridListProps<T> = {
  records: T[];
  renderItem: (records: T) => React.ReactNode;
};

// generic constraint
type hasId = { id?: number };

const GridList = <T extends hasId>({
  records,
  renderItem,
}: TGridListProps<T>) => {
  const gridList =
    records.length > 0
      ? records.map((rec) => (
          <Col
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
            key={rec.id}
          >
            {renderItem(rec)}
          </Col>
        ))
      : "there are no categories";

  return <Row>{gridList}</Row>;
};

export default GridList;
