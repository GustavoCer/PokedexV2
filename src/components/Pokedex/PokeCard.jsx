import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PokeCard = ({ url }) => {
  const [pokemon, setPokemon] = useState();
  useEffect(() => {
    const URL = url;
    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokedex/${pokemon.id} `);
  };

  return (
    <article
      className={`poke-card zoom border-${pokemon?.types[0].type.name}`}
      onClick={handleClick}
    >
      <header className={`poke-card__header bg-${pokemon?.types[0].type.name}`}>
        <img
          className="poke-card__sprite"
          src={pokemon?.sprites.other["official-artwork"].front_default}
          alt=""
        />
      </header>
      <section className="poke-card__body">
        <h3 className={`poke-card__name color-${pokemon?.types[0].type.name}`}>
          {pokemon?.name}
        </h3>
        <ul className="poke-card__types-container">
          {pokemon?.types.map((type, index) => (
            // <li className='poke-card__type' key={type.type.name}>{type.type.name}</li>
            <li
              className={`poke-card__type  bg-${pokemon?.types[index].type.name} `}
              key={type.type.name}
            >
              {type.type.name}
            </li>
          ))}
        </ul>
        <p>Type</p>
        <hr />
      </section>
      <footer className="poke-card__footer">
        <ul className="poke-card__stats-container">
          {pokemon?.stats.map((stat) => (
            <li className="poke-card__stat" key={stat.stat.name}>
              <span className="poke-card__label">{stat.stat.name}</span>
              <span
                className={`poke-card__number color-${pokemon?.types[0].type.name}`}
              >
                {stat.base_stat}
              </span>
            </li>
          ))}
        </ul>
      </footer>
    </article>
  );
};

export default PokeCard;
