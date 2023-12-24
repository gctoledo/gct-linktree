import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex w-full justify-center items-center flex-col text-white min-h-screen">
      <h1 className="font-bold text-6xl mb-2">404</h1>
      <h1 className="font-bold text-4xl mb-4">Pagina nao encontrada</h1>
      <p className="italic text-1xl mb-4">
        Voce caiu em uma pagina que nao existe.
      </p>

      <Link to={"/"} className="bg-gray-50/20 py-1 px-4 rounded-md">
        Voltar para home
      </Link>
    </div>
  );
};

export default Error;
