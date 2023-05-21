import React from "react";
import { PokemonDetail, pokemon } from "../interface";
import PokemonList from "./PokemonList";
import { Detail } from "../App";
interface Props {
  pokemmons: PokemonDetail[];
  detail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}
const PokemonColection = (props: Props) => {
  const { pokemmons, detail, setDetail } = props;
  const selectPokemon = (id: number) => {
    if (!detail.isopen) {
      setDetail({
        id: id,
        isopen: true,
      });
    }
  };
  return (
    <section
      className={
        detail.isopen
          ? "flex items-center text-[#3d405b] flex-wrap font-semibold justify-center mt-8 overflow-y-hidden"
          : "flex items-center text-[#3d405b] flex-wrap font-semibold justify-center mt-8 "
      }
    >
      {detail.isopen ? (
        <div className="h-[100vh] w-[100vw]"></div>
      ) : (
        <div></div>
      )}
      {pokemmons.map((poke, index) => {
        return (
          <div key={index} onClick={() => selectPokemon(poke.id)}>
            <PokemonList
              //key={index}
              detail={detail}
              setDetail={setDetail}
              id={poke.id}
              name={poke.name}
              abilities={poke.abilities}
              image={poke.sprites.front_default}
            />
          </div>
        );
      })}
    </section>
  );
};

export default PokemonColection;
