import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import PokemonColection from "./components/PokemonColection";
import { pokemon } from "./interface";
interface Pokemon {
  name: string;
  url: string;
}
export interface Detail {
  id: number;
  isopen: boolean;
}
const App: React.FC = () => {
  const [pokemon, setPokemon] = useState<pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<Detail>({
    id: 0,
    isopen: false,
  });

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      setNextUrl(res.data.next);
      setLoading(false);
      res.data.results.forEach(async (pokemon: Pokemon) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );

        setPokemon((p) => [...p, poke.data]);
        setLoading(false);
      });
    };
    getPokemon();
  }, []);
  const nextPage = async () => {
    const res = await axios.get(nextUrl);
    res.data.results.forEach(async (pokemon: Pokemon) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokemon((p) => [...p, poke.data]);
      setLoading(false);
    });
  };
  return (
    <div className="App">
      <div className="flex items-center h-[100vh] flex-col my-4 mx-8">
        <header className="text-[#81b29a] text-4xl font-semibold tracking-[0.25rem] text-center">
          Pokemon
        </header>
        <PokemonColection
          pokemmons={pokemon}
          detail={detail}
          setDetail={setDetail}
        />
        {!detail.isopen ? (
          <div className=" fixed bottom-5 left-[50%] translate-x-[-50%] flex justify-around w-[50%] mt-6">
            <button
              onClick={nextPage}
              className="border-none rounded-xl text-[#3d405b] cursor-pointer text-2xl p-2  bg-[#81b29a]"
            >
              {loading ? "Loading" : "Load Mode"}{" "}
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default App;
