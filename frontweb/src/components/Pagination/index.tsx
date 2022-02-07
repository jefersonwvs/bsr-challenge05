import ReactPaginate from 'react-paginate';
import { ReactComponent as ArrowIcon } from 'assets/images/arrow-left.svg';

import './styles.css';

type Props = {
  forcePage?: number;
  pageCount: number;
  range: number;
  onChange?: (pageNumber: number) => void;
};

const Pagination = function (props: Props) {
  //
  const { forcePage, pageCount, range, onChange } = props;

  return (
    <ReactPaginate
      forcePage={forcePage}
      pageCount={pageCount}
      pageRangeDisplayed={range}
      marginPagesDisplayed={1}
      //
      containerClassName="pagination-container"
      pageLinkClassName="pagination-item"
      activeLinkClassName="pagination-item-active"
      breakClassName="pagination-item"
      disabledClassName="pagination-arrow-inactive"
      //
      previousLabel={
        <div className="pagination-arrow">
          <ArrowIcon />
        </div>
      }
      previousClassName="pagination-arrow-previous"
      nextLabel={
        <div className="pagination-arrow">
          <ArrowIcon />
        </div>
      }
      nextClassName="pagination-arrow-next"
      //
      onPageChange={(items) => (onChange ? onChange(items.selected) : {})}
    />
  );
};

export default Pagination;
