import { Outlet } from "react-router";
import "./App.css";
import Header from "./layout/header"
import "../node_modules/boxicons/css/boxicons.min.css";
import "../node_modules/remixicon/fonts/remixicon.css";
import { useEffect } from "react";
import { initScroll } from "./utils/scrollSetup";

function App() {
  useEffect(() => {
    initScroll();
  }, []);

  return (
    <>
      <Header></Header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
