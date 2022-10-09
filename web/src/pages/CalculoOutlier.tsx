import { ArrowLeft } from "phosphor-react";
import { Link } from "react-router-dom";
import CalculoComponents from "../components/CalculoComponents";


const CalculoOutlier = () => {
  return (
    <>
      <span className="m-4 leading-6 text-zinc-900 font-medium text-xl flex justify-center items-center content-center">
        Cálculo Outlier
      </span>
      <button
        type="button"
        className="top-5 left-5 absolute text-zinc-500 hover:text-zinc-100"
      >
        <Link to="/menu">
          <ArrowLeft weight="bold" className="w-6 h-6" />
        </Link>
      </button>
      <div className="text-zinc-900 flex w-screen justify-center items-center content-center">
        <CalculoComponents />
      </div>
    </>
  );
};

export default CalculoOutlier;