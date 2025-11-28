import './styles/paginaciongrande.css'

const PaginacionGrande = ({
  page,
  totalPages,
  setPage
}: {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="pagination">
      <button 
        onClick={() => setPage((p) => p - 1)} 
        disabled={page === 1}
      >
        ◀ Anterior
      </button>

      <span>
        Página {page} de {totalPages}
      </span>

      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={page === totalPages}
      >
        Siguiente ▶
      </button>
    </div>
  );
};

export default PaginacionGrande;
