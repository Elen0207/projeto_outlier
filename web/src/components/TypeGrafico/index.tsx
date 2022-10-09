import { MouseEvent } from "react";
import { showGrafico } from "../../../server/api";

interface Props {
  file: File;
  variaveis: Array<string>;
}

export function TypeGrafico ({ file, variaveis }: Props) {
  const optionsGrafico = {
    grafico_barras: "Em barras",
    grafico_dispersao: "Dispersão",
    grafico_boxplot: "Boxplot",
    grafico_dbscan: "Dbscan"
  }

  const getGrafico = async (type: string, e: MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await showGrafico(file, variaveis[0], variaveis[1], type)
      return true
    } catch (err) {
      alert("Desculpe, mas acontenceu um erro");
      console.log(err);
    }
  }

  return (
    <div className="w-full m-4 gap-2 flex">
      { Object.entries(optionsGrafico).map((value) => {
          return (
            <button
              className="mt-2 mb-2 gap-2 min-w-[304px] min-h-[20px] p-2 bg-[#0371D8] rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-cyan-500 transition-colors disabled:opacity-50 disabled:hover:bg-cyan-500"
              onClick={(e) => { getGrafico(value[0].toString(), e) }}
            >
              {value[1]}
            </button>
          )
        })
      }
    </div>
  );
};
