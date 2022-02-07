import { ReactComponent as ArrowIcon } from 'assets/images/arrow-left.svg';

import './styles.css';

const Pagination = function () {
  return (
    <div className="pagination-container">
      <ArrowIcon className="pagination-arrow-previous" />
      <div className="pagination-item pagination-item-active">1</div>
      <div className="pagination-item">2</div>
      <div className="pagination-item">3</div>
      <div className="pagination-item">...</div>
      <div className="pagination-item">5</div>
      <ArrowIcon className="pagination-arrow-next pagination-arrow-enabled" />
    </div>
  );
};

export default Pagination;
