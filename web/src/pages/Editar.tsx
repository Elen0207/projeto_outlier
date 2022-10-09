import { EditarComponents } from "../components/EditarComponents"

const Editar = () => {
  return (
    <>
      <span className="m-4 leading-6 text-zinc-900 font-medium text-xl flex justify-center items-center content-center">
        Editar cadastro
      </span>
      <div className="text-zinc-900 flex w-screen justify-center items-center content-center">
        <EditarComponents />
      </div>
    </>
  );
};

export default Editar;