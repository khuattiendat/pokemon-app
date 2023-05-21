import React, { useState, useEffect } from "react";
import { Detail } from "../App";
interface Props {
  id: number;
  name: string;
  image: string;
  detail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
  abilities:
    | {
        name: string;
        ability: string;
      }[]
    | undefined;
}
const PokemonList: React.FC<Props> = (props) => {
  const { id, name, image, abilities, detail, setDetail } = props;
  const [isSelected, setSelected] = useState(false);
  useEffect(() => {
    setSelected(id === detail?.id);
  }, [detail]);
  const closeDetail = () => {
    setDetail({
      id: 0,
      isopen: false,
    });
  };
  return (
    <div className="">
      {isSelected ? (
        <section className="bg-[#f4f1de] rounded-xl h-[300px] top-[30%] left-[41%] absolute text-center w-[270px]">
          <div className="flex items-center flex-col justify-center">
            <p
              className="cursor-pointer text-2xl mt-4 mr-4 mb-0 ml-auto"
              onClick={closeDetail}
            >
              X
            </p>
            <div className="items-center bg-[#f2cc8f] flex justify-center w-full">
              <img src={image} alt="pokemon" className="detail-img" />
              <p className="text-[#3d405b] text-2xl font-bold "> {name}</p>
            </div>
            <div className="self-start flex flex-wrap gap-2 m-4 text-start">
              <p className="detail-ability"> Ablities: </p>
              {abilities?.map((ab: any, index: number) => {
                return (
                  <div key={index} className="">
                    {ab.ability.name}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <div className="">
          <section className="flex items-center bg-[#f4f1de] rounded-xl cursor-pointer flex-col justify-center m-4 px-4">
            <p className="mt-2"> {name} </p>
            <img src={image} alt="pokemon" />
          </section>
        </div>
      )}
    </div>
  );
};
export default PokemonList;
