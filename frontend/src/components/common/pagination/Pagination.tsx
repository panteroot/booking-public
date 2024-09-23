import styles from "./pagination.module.scss";

type Props = {
  page: number;
  pages: number;
  handleClickPagination: (page: number) => void;
};

const Pagination = ({ page, pages, handleClickPagination }: Props) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <ul id="pagination">
        {pageNumbers.map((number) => (
          <li>
            <button
              className={
                page === number
                  ? `${styles.button} ${styles.buttonCurrentPage}`
                  : `${styles.button}`
              }
     
              onClick={() => handleClickPagination(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
