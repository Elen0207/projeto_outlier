import { useState } from "react";
import { Link } from "react-router-dom";
import { items } from "./MenuItems";
import { X, User, SignOut, PencilSimple } from "phosphor-react";


export function Logout () {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex absolute">
      <div
        className={` ${open ? "w-60 h-50 rounded  m-2 bg-[#0371D8]" : "w-12"
          } duration-300`}
      >
        { open ?
          <button
            className={`absolute cursor-pointer right-2 top-3`}
            onClick={() => setOpen(false)}
          >
            <X weight="bold" color="#F4F4F4" className="w-4 h-4 m-1" />
          </button>
          :
          <button
            className={`absolute cursor-pointer m-2 right-1 top-3`}
            onClick={() => setOpen(true)}
          >
            <User size={28} color="#0371D8" weight="regular" className="ml-4" />
          </button>
        }

        <ul className="pt-6 font-medium text-sm text-slate-100">
          { items.map((Menu, index) => (
            <li
              key={index}
              className={`flex gap-2 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${index === 0 && "bg-light-white"}`}
              onClick={() => `${ Menu.hasFunction ? sessionStorage.setItem('@users:user', "") : undefined }` }
            >
              <span className={`${!open && "hidden"} flex gap-2 justify-center items-center content-center origin-left duration-200`}>
                <Link to={Menu.src} className="flex gap-2 justify-center items-center content-center">
                  { Menu.title === "Sair" ? 
                    <SignOut weight="regular" color="#F4F4F4" className="w-4 h-4 m-1" /> :
                    <PencilSimple weight="regular" color="#F4F4F4" className="w-4 h-4 m-1"/>  
                  }
                  {Menu.title}
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}