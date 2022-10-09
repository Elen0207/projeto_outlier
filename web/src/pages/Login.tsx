import { LoginComponents } from "../components/LoginComponents";
import logitipoImg from "../assets/logotipo.svg";

export default function Login() {
  return (
    <>
      <header className="absolute flex w-screen justify-end">
        <img src={logitipoImg} alt="logotipo-fundo-azul" className="m-4 w-[20%] h-[20%] mt-1" />
      </header>
      <div className="bg-[#097AE3] text-zinc-300 flex w-screen h-screen justify-center items-center content-center">
        <LoginComponents />
      </div>
    </>
  );
}
