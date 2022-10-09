import { HistoricoComponents } from "../components/HistoricoComponents";


export default function HistoricosAnalises () {
  return (
    <>
      <span className="m-4 leading-6 text-zinc-900 font-medium text-xl flex justify-center items-center content-center">
        Histórico de análises
      </span>
      <div className="text-zinc-900 flex w-screen justify-center items-center content-center">
        <HistoricoComponents />
      </div>
    </>
  );
};