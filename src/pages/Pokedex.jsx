import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pokedex/Pagination";
import PokeCard from "../components/Pokedex/PokeCard";
import '../App.css'

const Pokedex = () => {
  const { trainer } = useSelector((state) => state);
  const [pokemons, setPokemons] = useState();
  const [types, setTypes] = useState();
  const [typeSelected, setTypeSelected] = useState("All pokemons");
  const navigate = useNavigate();

  useEffect(() => {
    if (typeSelected !== "All pokemons") {
      // hacer la petición de los pokemons por tipo
      axios
        .get(typeSelected)
        .then((res) => setPokemons(res.data.pokemon.map((e) => e.pokemon)))
        .catch((err) => console.log(err));
    } else {
      // hacer la petición de todos los pokemons
      const URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000";
      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [typeSelected]);
  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type";
    axios
      .get(URL)
      .then((res) => setTypes(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.search.value.trim().toLowerCase();
    navigate(`/pokedex/${input}`);
  };

  const handleChange = (e) => {
    setTypeSelected(e.target.value);
  };

  //Logica de la paginacion
  const [page, setPage] = useState(1);
  const [pokePorPage, setpokePorPage] = useState(8);
  const initialPoke = (page - 1) * pokePorPage;
  const finalPoke = page * pokePorPage;
  const maxPage = pokemons && Math.ceil(pokemons.length / pokePorPage);

  return (
    <div className="pokedex">
      <img className="object-cover" src="/headerPoke.png" alt="" />
      <div>
        <h2 className="pokedex__welcome">
          {" "}
          Welcome {trainer}, <p> here you can find your favorite pokemon.</p>
        </h2>
      </div>
      <div className="pokedex__searchFlex">
        <form className="pokedex__form" onSubmit={handleSubmit}>
          <input
            placeholder="Place Pokemon Name"
            className="pokedex__search"
            id="search"
            type="text"
          />
          <button className="pokedex__btn  bg-red-500">Search</button>
        </form>
        <select onChange={handleChange} className="selectType capitalize ">
          <option value="All pokemons">All pokemons</option>
          {types?.map((type) => (
            <option
              className="selecType__search"
              key={type.url}
              value={type.url}
            >
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="poke-container capitalize">
        {pokemons?.slice(initialPoke, finalPoke).map((poke) => (
          <PokeCard key={poke.url} url={poke.url} />
        ))}
      </div>
      <Pagination page={page} maxPage={maxPage} setPage={setPage} />
    </div>
  );
};
export default Pokedex;
