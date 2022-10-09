import { ArrowLeft, DownloadSimple, FloppyDisk } from "phosphor-react";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { downloadBoxplotCSV, downloadMadCSV, downloadDbscanCSV, saveHistorics } from "../../server/api";
import { userStorage } from "./EditarComponents";
import { Loading } from "./Loading";
import { TypeGrafico } from "./TypeGrafico";

interface CustomizedState {
  resposta: [];
  arquivo: File;
  variavelGrafico: Array<string>;
  tipoAnalise: string;
  variaveis: string | Array<string>;
}

export function ResultadoComponents() {
  let navigate = useNavigate();
  let location = useLocation();
  const response: CustomizedState = location.state as CustomizedState;
  const [isLoading, setIsLoading] = useState<boolean>();

  const confirmExitPage = () => {
    window.confirm(
      "Atenção! Ao sair da página perderá o resultado, faça o download dos arquivos"
    )
      ? navigate("/menu", { replace: true })
      : null;
  };

  const historico =
    response.resposta.length > 0
      ? {
          outlier: true,
          nome_arquivo: response.arquivo.name,
        }
      : {
          outlier: false,
          nome_arquivo: response.arquivo.name,
        };

  async function historics(e: MouseEvent<HTMLButtonElement>)  {
    e.preventDefault();
    setIsLoading(true);
    const storageUser: userStorage | null = JSON.parse(sessionStorage.getItem('@users:user') || "");
    const idUser = storageUser && Array.isArray(storageUser) ? storageUser[0]?.id : storageUser?.id || "";

    await saveHistorics(historico.outlier, historico.nome_arquivo.toString(), idUser)
    .then(() => {
      setIsLoading(false);
      alert('Salvo com sucesso');
    })
    .catch((err) => {
      alert("Desculpe, mas acontenceu um erro");
      setIsLoading(false);
      console.log(err);
    });
   
  }

  async function downloadCSV(e: MouseEvent<HTMLButtonElement>)  {
    e.preventDefault();
    setIsLoading(true);
    let resp

    try {
      if (response.tipoAnalise === "boxplot") {
        resp = await downloadBoxplotCSV(response.arquivo, response.variaveis.toString())
      } else if (response.tipoAnalise === "mad") {
        resp = await downloadMadCSV(response.arquivo, response.variaveis.toString())

      } else if (response.tipoAnalise === "dbscan") {
        resp = await downloadDbscanCSV(response.arquivo, response.variaveis[0], response.variaveis[1])
      } 

      setIsLoading(false);
      alert('Download realizado com sucesso na sua pasta raiz');
    } catch (err) {
      alert("Desculpe, mas acontenceu um erro");
      setIsLoading(false);
      console.log(err);
    }
  }
  

  return (
    <>
      <button
        className="top-5 left-5 absolute text-zinc-500 hover:text-zinc-100"
        onClick={confirmExitPage}
      >
        <ArrowLeft weight="bold" className="w-6 h-6" />
      </button>

        { response && (
          <div className="mt-10 justify-center items-center content-center">
          <h2 className="font-semibold">Resultado da análise:</h2>
          <div className="flex justify-center items-center content-center">
            <table className="w-3/4 m-2 mb-8 border-collapse border border-slate-40">
              <thead>
                <tr>
                  <th className="border border-slate-300"> Tipo de Análise </th>
                  <th className="border border-slate-300"> Variável </th>
                  <th className="border border-slate-300"> Outlier </th>
                  <th className="border border-slate-300"> Arquivo </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300">
                    {response.tipoAnalise.toUpperCase()}{" "}
                  </td>
                  <td className="border border-slate-300">
                    {response.variaveis}
                  </td>
                  <td className="border border-slate-300">
                    {historico.outlier ? "Sim" : "Não"}
                  </td>
                  <td className="border border-slate-300">
                    {historico.nome_arquivo}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="font-semibold">Escolha o gráfico que deseja visualizar:</h2>
          <div className="flex justify-center items-center content-center">
              <TypeGrafico
                file={response.arquivo}
                variaveis={response.variavelGrafico}
              />
            </div>
            { response.resposta.length > 0 && (
              <div className="flex m-4 justify-center items-center content-center">
                <button
                  className="mt-2 gap-2 min-w-[304px] min-h-[20px] p-2 bg-[#ff823a] rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-[#FBBC04] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-cyan-500 transition-colors disabled:opacity-50 disabled:hover:bg-cyan-500"
                  onClick={(e) => {downloadCSV(e)}}
                >
                  <DownloadSimple weight="bold" className="w-6 h-6" />
                  { isLoading ? <Loading /> : "Exportar o resultado completo" }
                </button>
              </div>
            )}

            <div className="flex m-4 justify-center items-center content-center">
                <button
                  className="mt-2 gap-2 min-w-[304px] min-h-[20px] p-2 bg-[#4FBE2C] rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-[#D6EA71] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-cyan-500 transition-colors disabled:opacity-50 disabled:hover:bg-cyan-500"
                  onClick={(e) => {historics(e)}}
                >
                  <FloppyDisk weight="bold" className="w-6 h-6" />
                  { isLoading ? <Loading /> : "Salvar para histórico" }
                </button>
              </div>
            
            
          </div>
        )}

    </>
  );
}
