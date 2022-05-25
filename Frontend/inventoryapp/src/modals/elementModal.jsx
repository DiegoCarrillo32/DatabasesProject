import React from "react";
import ReactDOM from "react-dom";
import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import { useForm } from "../hooks/useForm";
import "./elementModal.css";
export const Modal = ({ isOpened, mode, onClose }) => {
  const [onChange, Form] = useForm({ area_nombre: "", placa: "", id_ubicacion: "", descripcion: "", garantia: "" });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(Form);
  };
  return isOpened
    ? ReactDOM.createPortal(
        <div className='modal'>
          <form className='modal-form' onSubmit={onSubmit}>
            <div className='close-modal' onClick={() => onClose()}>
              X
            </div>
            <h1>Agregar activo</h1>
            <Input
              label={"Name de area"}
              onChange={(e) => {
                onChange(e, "area_nombre");
              }}
              type={"text"}
            />
            <Input
              label={"Placa del activo"}
              onChange={(e) => {
                onChange(e, "placa");
              }}
              type={"text"}
            />
            <Input
              label={"Descripcion del activo"}
              onChange={(e) => {
                onChange(e, "descripcion");
              }}
              type={"text"}
            />
            <Input
              label={"Garantia del activo"}
              onChange={(e) => {
                onChange(e, "garantia");
              }}
              type={"text"}
            />
            <Input
              label={"Id de ubicacion"}
              onChange={(e) => {
                onChange(e, "id_ubicacion");
              }}
              type={"text"}
            />
            <Button type={"submit"} title={"Agregar"} herarchy={"primary"} />
          </form>
        </div>,
        document.getElementById("element-modal")
      )
    : null;
};
