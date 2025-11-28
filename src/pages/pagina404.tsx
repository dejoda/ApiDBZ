import "./styles/pagina404.css";

const pagina404 = () => {
  return (
    <main className="error404-page">
      <div className="tarjeta">
        <div className="imagen">
          <img src="src/assets/bulma.png" alt="" />
        </div>
        <div className="Parrafo">
          <h1>Error 404: Página no encontrada.</h1>
          <p>
            Lo sentimos, pero el recurso que buscas no existe o ha sido movido a
            otra ubicación. Es posible que la dirección haya sido escrita
            incorrectamente o que la página haya sido eliminada. Por favor,
            regresa al inicio o utiliza el menú para continuar navegando.
          </p>
        </div>
      </div>
    </main>
  );
};

export default pagina404;
