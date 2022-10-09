import { FormularioComponents } from "../components/FormularioComponents";


export default function Cadastro() {
  return (
    <>
      <span className="m-4 leading-6 text-zinc-900 font-medium text-xl flex justify-center items-center content-center">
        Criar cadastro
      </span>
      <div className="text-zinc-900 flex w-screen justify-center items-center content-center">
        <FormularioComponents />
      </div>
    </>
  );
}