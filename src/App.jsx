import { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import PokedexInfo from "./pages/PokedexInfo";

function App() {
  const [activeCart, setActiveCart] = useState();

  const trainer = useSelector((state) => state.trainer);

  return (
    <div className="mainDiv dark:bg-slate-800">
      <Routes>
        <Route path="/" element={<Home />} />

        {/* /* Rutas Protegidas */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:id" element={<PokedexInfo />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
