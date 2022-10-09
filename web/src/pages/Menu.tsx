import { Link } from "react-router-dom";
import { Logout } from '../components/Logout'


export default function Menu() {
  return (
    <>
      <header className="w-screen flex justify-between items-top">  
        <Logout />
      </header>
      
      <span className="m-4 leading-6 text-zinc-900 font-medium text-xl flex justify-center items-center content-center">
        Menu Principal
      </span>
      <div className="flex w-screen justify-center items-center content-center">
      <div className="mt-5 max-w-sm flex-1 justify-center items-center content-center">
        <Link to="/calculo">
          <button
            type="submit"
            className="mt-4 mb-4 min-w-[304px] w-full min-h-[20px] p-2 bg-[#0371D8] rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-cyan-500 transition-colors disabled:opacity-50 disabled:hover:bg-cyan-500"
          >
            Cálculos de Outlier
          </button>
        </Link>

        <Link to="/historicos">
          <button
            type="submit"
            className="mt-4 mb-4 min-w-[304px] w-full min-h-[20px] p-2 bg-[#0371D8] rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-cyan-500 transition-colors disabled:opacity-50 disabled:hover:bg-cyan-500"
          >
            Relatórios Salvos
          </button>
        </Link>
      </div>
      </div>
    </>
  );
}