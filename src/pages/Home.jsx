import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTrainerGlobal } from "../store/slices/trainer.slice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerGlobal(e.target.name.value.trim()));
    e.target.name.value = "";
    navigate("/pokedex");
  };
  return (
    <div className="home">
      <img src="/pokedex.png" alt="" />
      <h1 className="pokedex__hi">¡Hi Trainer!</h1>
      <p className="pokedex__p text-center font-medium">
        Write Your Name To Start
      </p>
      <form
        className="pokedex__formStart text-center border-color: rgb(0 0 0); "
        onSubmit={handleSubmit}
      >
        <input className="shadow-lg" id="name" type="text" />
        <button className="pokedex__btn px-1 bg-red-500">Start</button>
      </form>
    </div>
  );
};

export default Home;
