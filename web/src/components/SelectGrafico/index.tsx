import { useEffect, useState } from "react";

interface Props {
  headers: Array<string>;
  onVariavelData: (multivariavelData: Array<string>) => void;
}

export function SelectGrafico({ headers, onVariavelData }: Props) {
  const [ v1, setV1 ] = useState<string>("");
  const [ v2, setV2 ] = useState<string>("");

  useEffect(() => {
    if (v1 && v2) {
      handleSetVariaveis(v1, v2);
    }
  }, [v1, v2]);

  const handleSetVariaveis = (v1: string, v2: string) => {
    if (v1 === v2) {
      alert("As variaveis não podem ser iguais");
    } else {
      let array = [];
      array.push(v1, v2);
      onVariavelData(array);
    }
  };

  return (
    <div>
      <span className="text-zinc-900 font-regular">
        Selecione as variáveis para o gráfico:
      </span>
      <select
        key={3}
        className={`mt-2 mb-3 min-w-[304px] w-full min-h-[30px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none`}
        placeholder="Selecione a variável"
        onChange={(e) => setV1(e.target.value)}
        value={v1}
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

      <select
        key={4}
        className="mt-2 mb-3 min-w-[304px] w-full min-h-[30px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
        placeholder="Selecione a variável"
        onChange={(e) => setV2(e.target.value)}
        value={v2}
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
    </div>
  );
}
