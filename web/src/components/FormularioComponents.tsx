import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";
import { ArrowLeft } from "phosphor-react";
import { saveUser } from "../../server/api";

export function FormularioComponents() {
  let navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirmada, setSenhaConfirmada] = useState("");

  const [sentUser, setSentUser] = useState(false);
  const [isLoadingSend, setIsLoadingSend] = useState(false)


  async function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    if (senha !== senhaConfirmada) {
      alert("As senhas estão diferentes tente novamente")
      setSenha("")
      setSenhaConfirmada("")
    } else {
      setSentUser(true)
      event.preventDefault();
      setIsLoadingSend(true)
      const user = {
        nome: nome,
        email: email,
        departamento: departamento,
        senha: senha,
      }
  
      await saveUser(nome, email, senha, departamento).then((resp) => {
        setIsLoadingSend(false)
        sessionStorage.setItem('@users:user', JSON.stringify(user));
        navigate("/menu", { replace: true });
      }).catch((err) => {
        alert("Desculpe, mas acontenceu um erro")
        setIsLoadingSend(false)
        console.log(err)
      })
    }
  }

  const optionsDepartamentos = {
    adm: {
      text: "Administrativo", value: "adm"
    },
    financeiro: {
      text: "Financeiro", value: "financeiro"
    },
    ti: {
      text: "T.I.", value: "ti"
    },
    vendas: {
      text: "Vendas", value: "vendas"
    },
    produtos: {
      text: "Produtos", value: "produtos"
    },
    gerencia: {
      text: "Gerencia", value: "gerencia"
    }
  }


  return (
    <form onSubmit={handleSubmitForm} className="my-4 w-[60%] flex-col">
      <span className="text-zinc-900 font-regular text-sm">
        Nome completo:
      </span>
      {sentUser && nome === "" &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha seu nome completo
          </span>
        </>
      }
      <input
        key={1}
        type="text"
        className="mt-2 mb-3 min-w-[304px] w-full min-h-[30px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
        placeholder="Digite seu nome completo"
        onChange={(e) => setNome(e.target.value)}
        value={nome}
      />


      <span className="text-zinc-900 font-regular text-sm">
        Email:
      </span>
      {sentUser && !email &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha seu email
          </span>
        </>
      }
      <input
        key={2}
        type="email"
        className="mt-2 mb-3 min-w-[304px] w-full min-h-[30px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
        placeholder="Digite um email ainda não cadastrado"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />



      <span className="text-zinc-900 font-regular text-sm">
        Departamento:
      </span>
      {sentUser && departamento === "" &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha um departamento
          </span>
        </>
      }
      <select
        className="mt-2 mb-3 min-w-[304px] w-full min-h-[30px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
        placeholder="Selecione a departamento do produto"
        onChange={(e) => setDepartamento(e.target.value)}
        value={departamento}
      >
        {Object.entries(optionsDepartamentos).map(([key, items]) => {
          return (
            <option value={items.value} key={key}>
              {items.text}
            </option>
          )
        })
        }
        <option data-default disabled selected></option>
      </select>



      <span className="text-zinc-900 font-regular text-sm">
        Senha:
      </span>
      {sentUser && !senha &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha uma nova senha
          </span>
        </>
      }
      <input
        key={3}
        type="password"
        className="mt-2 mb-3 min-w-[304px] w-full min-h-[30px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
        placeholder="Digite uma senha"
        onChange={(e) => setSenha(e.target.value)}
        value={senha}
      />



      <span className="text-zinc-900 font-regular text-sm">
        Confirme a Senha:
      </span>
      {sentUser && senhaConfirmada.length == 0 &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha a senha digita acima
          </span>
        </>
      }
      <input
        key={4}
        type="password"
        className="mt-2 mb-3 min-w-[304px] w-full min-h-[30px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
        placeholder="Confirme a senha digitada acima"
        onChange={(e) => setSenhaConfirmada(e.target.value)}
        value={senhaConfirmada}
      />

      <button
        type="button"
        className="top-5 left-5 absolute text-zinc-500 hover:text-zinc-100"
      >
        <Link to="/">
          <ArrowLeft weight="bold" className="w-6 h-6" />
        </Link>
      </button>

      <button
        type="submit"
        className="mt-4 mb-4 min-w-[304px] w-full min-h-[20px] p-2 bg-[#0371D8] rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-cyan-500 transition-colors disabled:opacity-50 disabled:hover:bg-cyan-500"
      >
        {isLoadingSend ? <Loading /> : "Salvar"}
      </button>
    </form>
  )
}