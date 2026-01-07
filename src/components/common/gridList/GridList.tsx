import { Row, Col } from "react-bootstrap";
import { LottieHandler } from "@components/feedback";

type TGridListProps<T> = {
  records: T[];
  renderItem: (records: T) => React.ReactNode;
  emptyMessage?: string;
};

// generic constraint
type hasId = { id?: number };

const GridList = <T extends hasId>({
  records,
  renderItem,
  emptyMessage,
}: TGridListProps<T>) => {
  const gridList =
    records.length > 0 ? (
      records.map((rec) => (
        <Col
          xs={6}
          md={3}
          className="d-flex justify-content-center mb-5 mt-2"
          key={rec.id}
        >
          {renderItem(rec)}
        </Col>
      ))
    ) : (
      <LottieHandler type="empty" message={emptyMessage} />
    );

  return <Row>{gridList}</Row>;
};

export default GridList;
