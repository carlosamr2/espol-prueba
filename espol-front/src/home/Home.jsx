import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import ModalAgregar from "../components/ModalAgregar";
import axios from "axios";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [people, setPeople] = useState([]);
  const [option, setOption] = useState("Agregar");
  const [idRegistro, setIdRegistro] = useState("");

  const fetchData = async () => {
    try {
      const response = axios.get("http://localhost:50189/api/users/all");
      await toast.promise(response, {
        loading: "Enviando...",
        success: (res) => {
          if (res.status === 200) {
            setPeople(res.data);
            return "Se obtuvieron los usuarios correctamente";
          } else {
            return "Error al obtener los usuarios";
          }
        },
        error: (e) => {
          if (e.response.status === 500) {
            return "Error interno del servidor";
          } else if (e.response.status === 400) {
            return "Error en los datos enviados";
          } else {
            return "Error al enviar el mensaje";
          }
        },
      });
    } catch (error) {}
  };

  const deleteUser = async (id) => {
    try {
      const response = axios.delete(
        `http://localhost:50189/api/users/delUser/${id}`
      );
      await toast.promise(response, {
        loading: "Eliminando...",
        success: (res) => {
          if (res.status === 200) {
            fetchData();
            return "Se eliminó el registro correctamente";
          } else {
            return "Error al eliminar el usuario";
          }
        },
        error: (e) => {
          if (e.response.status === 500) {
            return "Error interno del servidor";
          } else if (e.response.status === 400) {
            return "Error en los datos enviados";
          } else {
            return "Error al enviar el mensaje";
          }
        },
      });
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleModal = () => setOpen(!open);
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <ModalAgregar
        isOpen={open}
        toggle={toggleModal}
        option={option}
        idRegistro={idRegistro}
        setIdRegistro={setIdRegistro}
        setOption={setOption}
        reload={fetchData}
      />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Usuarios</h1>
            <p className="mt-2 text-sm text-gray-700">
              Una lista con todos los usuarios en el sistema, incluyendo su
              nombre, título, correo electrónico y rol.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => {
                setOption("Agregar");
                toggleModal();
              }}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            >
              Agregar usuario
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Nombre de usuario
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Rol
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pr-4 pl-3 sm:pr-0"
                    >
                      <span className="sr-only">Editar</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {people.map((person) => (
                    <tr key={person.email}>
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                        {person.name}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {person.email}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {person.username}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {person.role}
                      </td>
                      <td className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0 space-x-3">
                        <a
                          onClick={() => {
                            setOption("Editar");
                            setIdRegistro(person.id);
                            toggleModal();
                          }}
                          className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                        >
                          Editar
                        </a>
                        <a
                          onClick={() => deleteUser(person.id)}
                          className="text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          Eliminar
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
