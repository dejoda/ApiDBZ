import './styles/paginacioncompacta.css'
const PaginacionCompacta = ({
  page,
  totalPages,
  setPage
}: {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="compact-pagination">
      <button
        className="cp-btn prev"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
      >
        ◀
      </button>

      <span className="cp-info">
        {page} / {totalPages}
      </span>

      <button
        className="cp-btn next"
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
      >
        ▶
      </button>
    </div>
  );
};

export default PaginacionCompacta;
