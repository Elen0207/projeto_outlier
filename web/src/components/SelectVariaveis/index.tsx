import { useEffect, useState } from "react";

interface Props {
  headers: Array<string>;
  onBoxplotData: (boxplotData: string) => void;
  onMADData: (madData: string) => void;
  onDbscanData: (dbscanData: Array<string>) => void;
}

export function SelectVariaveis({
  headers,
  onBoxplotData,
  onMADData,
  onDbscanData,
}: Props) {
  const [boxplot, setBoxplot] = useState(false);
  const [mad, setMad] = useState(false);
  const [dbscan, setDbscan] = useState(false);

  const [boxplotData, setBoxplotData] = useState("");
  const [madData, setMadData] = useState("");
  const [dbscanData, setDbscanData] = useState<Array<string>>([]);

  useEffect(() => {
    onBoxplotData(boxplotData);
    onMADData(madData);
    onDbscanData(dbscanData);
  }, [boxplotData, madData, dbscanData]);

  const handleDbscan = () => {
    setDbscan(!dbscan);
    setBoxplot(false);
    setBoxplotData("");

    setMad(false);
    setMadData("");
  };

  const handleBoxplot = () => {
    setBoxplot(!boxplot);
    setDbscan(false);
    setDbscanData([]);

    setMad(false);
    setMadData("");
  };

  const handleMad = () => {
    setMad(!mad);
    setDbscan(false);
    setDbscanData([]);

    setBoxplot(false);
    setBoxplotData("");
  };

  const handleSetDbscan = (novaVariavel: string) => {
    let array = [];
    array.push(...dbscanData);
    const isNotNew = dbscanData.find((v) => v === novaVariavel);

    if (!isNotNew && array.length < 2) {
      array.push(novaVariavel);
      setDbscanData(array);
    } else if (array.length > 0) {
      const index = array.indexOf(novaVariavel);
      array.splice(index, 1);
      setDbscanData(array);
    }
  };

  return (
    <div>
      <span className="text-zinc-900 font-regular">
        Selecione o tipo da análise:
      </span>

      <div className="flex">
        <input
          type="checkbox"
          className={`mt-1 mb-1 mr-2 gap-2 rounded`}
          value="boxplot"
          checked={boxplot}
          onChange={handleBoxplot}
        />
        Boxplot
        <input
          type="checkbox"
          className={`mt-1 mb-1 mr-2 ml-4 gap-2 rounded`}
          value="mad"
          checked={mad}
          onChange={handleMad}
        />
        MAD
        <input
          type="checkbox"
          className={`mt-1 mb-1 mr-2 ml-4 gap-2 rounded`}
          value="dbscan"
          checked={dbscan}
          onChange={handleDbscan}
        />
        Dbscan
      </div>

      {mad && (
        <>
          <span className="text-zinc-900 font-regular">
            Informe a variável que deve ser analisada no MAD:
          </span>
          <select
            key={1}
            className={`mt-2 mb-3 min-w-[304px] w-full min-h-[30px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none`}
            placeholder="Selecione a variável"
            onChange={(e) => setMadData(e.target.value)}
            value={madData}
          >
            {headers
              .toString()
              .split(",")
              .map((items, index) => {
                if (items.length >= 1)
                  return (
                    <option value={items} key={index}>
                      {items}
                    </option>
                  );
              })}
            <option disabled></option>
          </select>
        </>
      )}

      {boxplot && (
        <>
          <span className="text-zinc-900 font-regular">
            Informe a variável que deve ser analisada no Boxplot:
          </span>
          <select
            key={1}
            className={`mt-2 mb-3 min-w-[304px] w-full min-h-[30px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none`}
            placeholder="Selecione a variável"
            onChange={(e) => setBoxplotData(e.target.value)}
            value={boxplotData}
          >
            {headers
              .toString()
              .split(",")
              .map((items, index) => {
                if (items.length >= 1)
                  return (
                    <option value={items} key={index}>
                      {items}
                    </option>
                  );
              })}
            <option disabled></option>
          </select>
        </>
      )}

      {dbscan && (
        <>
          <span className="text-zinc-900 font-regular">
            Informe as variáveis que devem ser analisadas no DBSCAN:
          </span>
          <select
            key={2}
            className="mt-2 min-w-[304px] w-full min-h-[30px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
            placeholder="Selecione a variável"
            onChange={(e) => handleSetDbscan(e.target.value)}
            multiple={true}
            value={dbscanData}
          >
            {headers
              .toString()
              .split(",")
              .map((items, index) => {
                if (items.length >= 1)
                  return (
                    <option value={items} key={index}>
                      {items}
                    </option>
                  );
              })}
          </select>
        </>
      )}
      {dbscan && dbscanData.length > 0 && (
        <>
          <span className="mr-2 text-zinc-900 text-sm font-regular">
            Variáveis selecionadas:
          </span>
          <span className="gap-2 text-zinc-900 text-sm font-semibold">
            {dbscanData.toString().replace(/[","]/g, ", ")}
          </span>
        </>
      )}
    </div>
  );
}
