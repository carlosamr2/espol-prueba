import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
export default function ModalAgregar({
  isOpen,
  toggle,
  option,
  idRegistro,
  setOption,
  setIdRegistro,
  reload,
}) {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setFormData({
      Name: "",
      Email: "",
      Password: "",
    });
    setOption("");
    setIdRegistro("");
    toggle();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url;
    let toasterMessage;
    let request;
    if (option === "Editar") {
      url = `http://localhost:50189/api/users/updateUser/${idRegistro}`;
      toasterMessage = "Se actualizó el usuario correctamente";
      request = axios
        .put(url, formData)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          throw e;
        });
    } else {
      url = "http://localhost:50189/api/auth/register";
      toasterMessage = "Se creó el usuario correctamente";
      request = axios
        .post(url, formData)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          throw e;
        });
    }

    await toast.promise(request, {
      loading: "Enviando...",
      success: (res) => {
        if (res.status === 200) {
          handleClose();
          reload();
          return toasterMessage;
        } else {
          return "Error al enviar el mensaje";
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
  };

  const getUser = async (id) => {
    try {
      const response = axios.get(
        `http://localhost:50189/api/users/getUser/${id}`
      );
      await toast.promise(response, {
        loading: "Obteniendo...",
        success: (res) => {
          if (res.status === 200) {
            setFormData(res.data);
            return "Se obtuvo el registro correctamente";
          } else {
            return "Error al obtener el usuario";
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
    if (option === "Editar") {
      getUser(idRegistro);
    }
  }, [isOpen]);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Dialog
        as="div"
        className="relative z-20"
        open={isOpen}
        onClose={() => handleClose()}
      >
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full min-w-full p-2 text-center">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-600/75 duration-300 ease-in-out data-closed:opacity-0"
            />{" "}
            <DialogPanel
              transition
              className="flex-grow relative max-w-md text-center bg-white rounded-lg p-4 overflow-hidden shadow-xl my-8 w-auto duration-300 ease-in-out data-closed:scale-95 data-closed:opacity-0"
            >
              {/* <Toaster position="top-center" reverseOrder={false} /> */}
              <form onSubmit={handleSubmit}>
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base/7 font-semibold text-gray-900">
                    Información personal
                  </h2>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    Agrega toda tu información personal para crear tu cuenta.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                    <div>
                      <label
                        htmlFor="Name"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Nombre completo
                      </label>
                      <div className="mt-2">
                        <input
                          id="Name"
                          name="Name"
                          type="text"
                          value={formData.Name ? formData.Name : formData.name}
                          onChange={handleChange}
                          required
                          autoComplete="given-name"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="Email"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Correo electrónico
                      </label>
                      <div className="mt-2">
                        <input
                          id="Email"
                          name="Email"
                          type="Email"
                          value={
                            formData.Email ? formData.Email : formData.email
                          }
                          onChange={handleChange}
                          required
                          autoComplete="Email"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="Password"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Contraseña
                      </label>
                      <div className="mt-2">
                        <input
                          id="Password"
                          name="Password"
                          type="password"
                          onChange={handleChange}
                          required
                          autoComplete="given-name"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    onClick={() => handleClose()}
                    className="text-sm/6 font-semibold text-gray-900 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
