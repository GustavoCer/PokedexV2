import React from "react";
const Pagination = ({ page, maxPage, setPage }) => {
  const pagesPerBlock = 6;
  const currentBlock = Math.ceil(page / pagesPerBlock);
  const maxBlock = Math.ceil(maxPage / pagesPerBlock);
  const arrPages = [];
  const initialPage = (currentBlock - 1) * pagesPerBlock + 1;
  const finalPage =
    maxBlock === currentBlock ? maxPage : currentBlock * pagesPerBlock;
  for (let i = initialPage; i <= finalPage; i++) {
    arrPages.push(i);
  }
  const handlePage = (number) => {
    setPage(number);
  };
  const handlePrevious = () => {
    if (page - 1 > 0) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page + 1 <= maxPage) {
      setPage(page + 1);
    }
  };
  return (
    <div className="page">
      <ul className="pagination">
        <li
          className="  pagination__prev page__active zoom select-none"
          onClick={handlePrevious}
        >
          &lt;Prev
        </li>
        {arrPages.map((e) => (
          <li
            className={`pagination__prev pagination__btn  select-none ${
              page === e && "page__active"
            }`}
            onClick={() => handlePage(e)}
            key={e}
          >
            {e}
          </li>
        ))}
        <li
          className=" pagination__prev page__active zoom select-none"
          onClick={handleNext}
        >
          &gt;Next
        </li>
      </ul>
    </div>
  );
};
export default Pagination;
