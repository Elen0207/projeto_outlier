import { ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHistorics } from "../../server/api";
import { userStorage } from "./EditarComponents";

export interface Historics {
  sucesso: boolean;
  histories: [{
    criado: string;
    variaveis: string;
    outlier: string;
    nome_arquivo: string;
    usuario: number;
  }]
}

interface HistoricsUser {
  criado: string;
  variaveis: string;
  outlier: string;
  nome_arquivo: string;
  usuario: number;
}

export function HistoricoComponents(): JSX.Element {
  const [historics, setHistorics] = useState<HistoricsUser[]>();

  useEffect(() => {
    const fetchData = async () => {
      const historicos = await getHistorics();

      if (historicos?.sucesso === true) {
        const storageUser: userStorage | null = JSON.parse(sessionStorage.getItem('@users:user') || "");
        const idUser = storageUser && Array.isArray(storageUser) ? storageUser[0]?.id : storageUser?.id || "";
        const historicosDoUsuario = historicos.histories.filter(h => h.usuario === idUser)
        setHistorics(historicosDoUsuario);
        console.log(historicos)
      }
    }
    
    fetchData().catch(console.error);
  }, []);


  return (
    <>
     <button
        type="button"
        className="top-5 left-5 absolute text-zinc-500 hover:text-zinc-100"
      >
        <Link to="/menu">
          <ArrowLeft weight="bold" className="w-6 h-6" />
        </Link>
      </button>
      {historics && historics?.length > 0 ? (
        <table className="w-3/4 m-2 mt-8 border-collapse border border-slate-40">
              <thead>
                <tr>
                  <th className="border border-slate-300"> Criado </th>
                  <th className="border border-slate-300"> Outlier </th>
                  <th className="border border-slate-300"> Arquivo </th>
                </tr>
              </thead>
              <tbody>
                {
                  historics.map((h) => {
                    return (
                      <tr>
                      <td className="border border-slate-300">
                        {h.criado}
                      </td>
                      <td className="border border-slate-300">
                        {h.outlier ? "Sim" : "Não"}
                      </td>
                      <td className="border border-slate-300">
                        {h.nome_arquivo}
                      </td>
                    </tr>
                    )
                  })
                }
              </tbody>
            </table>
      ) : (
        <h2> Ainda não possui histórico </h2>
      )}
    </>
  )
}