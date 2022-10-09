import { ResultadoComponents } from "../components/ResultadoComponents";


export default function ResultadoAnalise () {
  return (
    <>
      <span className="m-4 leading-6 text-zinc-900 font-medium text-xl flex justify-center items-center content-center">
        Cálculo Outlier
      </span>
      <div className="text-zinc-900 flex w-screen justify-center items-center content-center">
        <ResultadoComponents />
      </div>
    </>
  );
};