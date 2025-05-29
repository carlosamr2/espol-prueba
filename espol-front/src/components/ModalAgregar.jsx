import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
export default function ModalAgregar({ isOpen, toggle }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    // Aquí podrías hacer una petición a una API, por ejemplo.
    let request = () =>
      axios.post("http://localhost:50189/api/auth/register", formData);
    toast.promise(request(), {
      loading: "Enviando...",
      success: "Datos enviados correctamente!",
      error: "Error al enviar los datos",
    });
  };

  return (
    <Dialog
      as="div"
      className="relative z-20"
      open={isOpen}
      onClose={() => toggle()}
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
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        id="Name"
                        name="Name"
                        type="text"
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
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="Email"
                        name="Email"
                        type="Email"
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
                  onClick={() => toggle()}
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
  );
}
