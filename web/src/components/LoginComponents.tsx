import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { getUser } from "../../server/api";

export interface UserDataResponse {
  sucesso?: boolean;
  usuario?: Array<{
    id?: number;
    nome: string;
    email: string;
    senha: string;
    departamento: string;
  }>
}

export function LoginComponents() {
  let navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [starLogin, setStarLogin] = useState(false);

  async function handleSubmitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStarLogin(true);
    try {
      const resp = await getUser(login.toString());
      if (resp.sucesso === true) {
        const validateSenha = resp.usuario?.find(user => user?.senha === senha)

        if (validateSenha) {
          sessionStorage.setItem('@users:user', JSON.stringify(resp.usuario));
          navigate("/menu", { replace: true });
        } else {
          setStarLogin(false);
          alert("Login ou senha inválido, tente novamente")
          setSenha("")
          setLogin("")
        }
      } else {
        setStarLogin(false);
        alert("Login ou senha inválido, tente novamente")
        setSenha("")
        setLogin("")
      }
    } catch (err)  {
      setStarLogin(false);
      alert("Desculpe, mas acontenceu um erro");
      console.log(err);
    }
  }

  return (
    <div className="bg-white max-w-sm p-4 border-8 rounded-md border-transparent flex-1 justify-center items-center text-center content-center">
      <header>
        <span className="leading-6 text-zinc-900 font-medium text-xl">
          Login
        </span>
      </header>

      <form onSubmit={handleSubmitLogin} className="my-4 w-full">
        <input
          type="text"
          className="mt-4 mb-4 min-w-[304px] w-full min-h-[30px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
          placeholder="Digite seu Email"
          onChange={(e) => setLogin(e.target.value)}
          value={login}
        />
        {starLogin && login === "" && (
          <span className="text-sm font-light max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Para entrar é necessário colocar um login válido
          </span>
        )}
        <input
          type="password"
          className="mt-4 mb-4 min-w-[304px] w-full min-h-[30px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
          placeholder="Digite sua senha"
          onChange={(e) => setSenha(e.target.value)}
          value={senha}
        />
        {starLogin && senha === "" && (
          <span className="text-sm font-light max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Ops.. Você esqueceu de digitar sua senha
          </span>
        )}
        {/* <br></br>
        <Link
          to="/reset-senha"
          className="leading-6 mt-3 text-sm text-center text-[#D80303] font-medium"
        >
          Esqueci minha senha
        </Link>

        <br></br> */}
        <button
          type="submit"
          disabled={
            (!senha && senha.length > 5) || (!login && login.length > 5)
          }
          className="bg-[#0371D8] mt-4 mb-4 min-w-[304px] w-full min-h-[30px] p-2 rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-cyan-500 transition-colors disabled:opacity-50 disabled:hover:bg-cyan-500"
        >
          Acessar cadastro
        </button>

        <br></br>
        <Link
          to="/cadastro"
          className="leading-6 mt-3 text-sm text-center text-[#0371D8] font-medium"
        >
          Criar conta
        </Link>
      </form>
    </div>
  );
}
