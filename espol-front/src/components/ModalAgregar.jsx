import React, { useState } from "react";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEnviarCodigo,
  fetchRecibirCorreo,
  pagarContratoCotizadorWeb,
} from "../../redux/actions/afiliacionActions";
import { CLEAR_AFILIACION } from "../../redux/actions/types";

export const ModalAgregar = ({ isOpen, toggle }) => {
  const [open, setOpen] = openState;

  return (
    <Dialog
      as="div"
      className="relative z-20"
      open={isOpen}
      initialFocus={() => null}
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

          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};