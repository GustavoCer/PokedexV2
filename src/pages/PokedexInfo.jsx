import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../components/Pokedex/styles/PokedexInfo.css'

const PokedexInfo = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState();
  const [pokecharact, setPokecharact] = useState();
  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, [id]);
  console.log(pokemon);
  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/ability/${id}/`;
    axios
      .get(URL)
      .then((res) => setPokecharact(res.data))
      .catch((err) => console.log(err));
  }, [id]);
  console.log(pokecharact);

  return (
    <div className="pokedex">
      <section className="Pokedexinfo">
        <img className="object-cover" src="/headerPoke.png" alt="" />
        <div className={`poke-card__info  }`}>
          {/* <div className="Pokeinfo bg-cover"> */}
          <article className="">
            <div className={`bg-${pokemon?.types[0].type.name} `}>
              <img
                className="Pokeinfo__img"
                src={pokemon?.sprites.other.home.front_default}
                alt=""
              />
            </div>
            <h3 className="capitalize pokedexInfo__name  bg-slate-200">
              Name: {pokemon?.name}
            </h3>
            <p className="Pokeinfo__id">
              {" "}
              Id# {"  "} {id}{" "}
            </p>
            <div className="pokedexinfo__Stats ">
              <div className="pokedexinfo__typeAndAbilities ">
                <h2 className="text-5xl capitalize bg-slate-200">Type</h2>
                {pokemon?.types.map((type, index) => (
                  <li
                    className={`Pokeinfo__type capitalize bg-${pokemon?.types[index].type.name} `}
                    key={index}
                  >
                    {" "}
                    {type.type.name}
                  </li>
                ))}

                <h2 className="text-5xl capitalize bg-slate-200">Abilities</h2>
                <ul className='pokecard__abilities capitalize flex flex-wrap text-3xl'>
                  {pokemon?.abilities.map((ability) => (
                    <li
                      className={`poke-card__abilities  `}
                      key={ability.ability.name}
                    >
                      {" "}
                      {ability.ability.name}{" "}
                    </li>
                  ))}
                </ul>
                <h2 className="text-5xl capitalize bg-slate-200">
                  Dream World Version
                </h2>
                <img
                  className="pokedex_Dream"
                  src={pokemon?.sprites.other.dream_world.front_default}
                  alt=""
                />
                <br />
                <br />
                <h2 className="text-5xl capitalize bg-slate-200">
                  Shiny Version
                </h2>
                <img
                  className="pokedex_shiny"
                  src={pokemon?.sprites.other.home.front_shiny}
                  alt=""
                />
              </div>
              <img className="pokedexInfo__move" src="./movements.png" alt="" />
              {/* <h2 className="text-5xl capitalize bg-slate-200 pokedexInfo__Movements" >Movements</h2> */}
              <ul className="pokecard__abilities capitalize flex flex-wrap text-3xl  ">
                {pokemon?.moves.map((move) => (
                  <li className={`poke-card__abilities`} key={move.move.name}>
                    {" "}
                    {move.move.name}{" "}
                  </li>
                ))}
              </ul>
              <br />
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default PokedexInfo;
