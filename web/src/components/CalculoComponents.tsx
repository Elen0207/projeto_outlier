import { MouseEvent, SetStateAction, useState } from "react";
import { ChartLineUp, Trash, UploadSimple } from "phosphor-react";
import { SelectVariaveis } from "./SelectVariaveis";
import { SelectGrafico } from "./SelectGrafico";
import { Loading } from "./Loading";
import { useNavigate } from "react-router";
import { calculoBoxplot, calculoDbscan, calculoMad } from "../../server/api";

export default function CalculoComponents(): JSX.Element {
  let navigate = useNavigate();
  const [file, setFile] = useState<Blob | null>();
  const [header, setHeader] = useState<Array<string> | null>();
  const [selectFile, setSelectFile] = useState<
    string | Array<string> | SetStateAction<undefined> | ArrayBuffer | null
  >();
  const [boxplotData, setBoxplotData] = useState("");
  const [madData, setMadData] = useState("");
  const [dbscanData, setDbscanData] = useState<Array<string>>([]);
  const [variavelGraficoData, setVariavelGraficoData] = useState<Array<string>>([]);
  const [underAnalysis, setUnderAnalysis] = useState<boolean>(false);

  const handleOnChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (
    data:
      | string
      | Array<string>
      | SetStateAction<undefined>
      | ArrayBuffer
      | null
  ) => {
    const csvRows = [data]
      .slice([data].indexOf("\n") + 1)
      .toString()
      .split("\n");
    const csvHeader = csvRows[0].split("\t");

    Array.isArray(csvRows)
      ? csvRows.map((i: string) => {
          const values = i.split(",");
          const obj = Array.isArray(csvHeader)
            ? csvHeader.reduce(
                (
                  object: { [x: string]: any },
                  header: string,
                  index: number
                ) => {
                  object[header] = values[index];
                  return object;
                },
                {}
              )
            : null;
          return obj;
        })
      : null;

    setHeader(csvHeader);
    setSelectFile(data);
  };

  const handleOnSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (file) {
      fileReader.onload = (event: ProgressEvent<FileReader>) => {
        const data = event.target ? event.target.result : null;
        csvFileToArray(data);
      };
      fileReader.readAsText(file);
    }
  };

  const handleDeletion = () => {
    setFile(null);
    setHeader(null);
    setSelectFile(null);
    setBoxplotData("");
    setMadData("");
    setDbscanData([]);
    setVariavelGraficoData([]);

    window.location.reload();
  };

  const runAnalysis = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setUnderAnalysis(true);
      let resp
      let tipoAnalise
      let variaveis

      if (boxplotData && selectFile && variavelGraficoData) {
        tipoAnalise = "boxplot"
        variaveis = boxplotData
        resp = await calculoBoxplot(file, boxplotData)
      } else if (madData && selectFile && variavelGraficoData) {
        tipoAnalise = "mad"
        variaveis = madData
        resp = await calculoMad(file, madData)
      } else if (dbscanData && selectFile && variavelGraficoData) {
        tipoAnalise = "dbscan"
        variaveis = dbscanData
        resp = await calculoDbscan(file, dbscanData[0], dbscanData[1])
      } 

      if (resp) {
        const prop = {
          resposta: resp,
          arquivo: file,
          variavelGrafico: variavelGraficoData,
          tipoAnalise: tipoAnalise,
          variaveis: variaveis 
        }
        navigate("/resultado-analises", { state: prop })
      } else {
        alert("Desculpe, mas não conseguimos encontrar um resultado");
        setUnderAnalysis(false);
      }
    } catch (err) {
      alert("Desculpe, mas acontenceu um erro");
      console.log(err);
      setUnderAnalysis(false);
    }
  };

  return (
    <form className="my-4 gap-2 w-[60%] flex-col">
      <span className="text-zinc-900 font-regular">Importar arquivo CSV:</span>
      <p></p>
      <input
        type={"file"}
        id={"csvFileInput"}
        accept={".csv"}
        onChange={handleOnChange}
      />
      {file && (
        <div>
          {selectFile && header ? (
            <>
              <div className="grid justify-items-end">
                <button
                  className="mb-4 gap-2 min-w-[304px] min-h-[10px] flex-1 flex justify-center items-center text-sm font-semibold"
                  onClick={() => handleDeletion()}
                >
                  <Trash size={20} />
                  Deseja apagar este arquivo
                </button>
              </div>

              <SelectVariaveis
                headers={header}
                onBoxplotData={setBoxplotData}
                onMADData={setMadData}
                onDbscanData={setDbscanData}
              />
              {boxplotData !== "" || madData !== "" || dbscanData.length > 1 ? (
                <SelectGrafico
                  headers={header}
                  onVariavelData={setVariavelGraficoData}
                />
              ) : null}

              {variavelGraficoData.length > 1 && (
                <button
                  className="mt-2 mb-2 gap-2 min-w-[304px] w-full min-h-[20px] p-2 bg-[#0371D8] rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-cyan-500 transition-colors disabled:opacity-50 disabled:hover:bg-cyan-500"
                  onClick={(e) => {
                    runAnalysis(e);
                  }}
                >
                  {underAnalysis ? (
                    <Loading />
                  ) : (
                    <>
                      <ChartLineUp size={18} weight="bold" />
                      Executar a análise
                    </>
                  )}
                </button>
              )}
            </>
          ) : (
            <button
              className="mt-2 mb-2 gap-2 min-w-[304px] w-full min-h-[20px] p-2 bg-[#0371D8] rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-cyan-500 transition-colors disabled:opacity-50 disabled:hover:bg-cyan-500"
              onClick={(e) => {
                handleOnSubmit(e);
              }}
            >
              <UploadSimple size={20} />
              Confirme o upload
            </button>
          )}
        </div>
      )}
    </form>
  );
}
