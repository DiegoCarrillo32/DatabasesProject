import React from "react";
import ReactDOM from "react-dom";
import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import { useForm } from "../hooks/useForm";
import "./elementModal.css";
export const Modal = ({ isOpened, mode, onClose }) => {
  const [onChange, Form] = useForm({ name: "", code: "" });
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
              label={"Name"}
              onChange={(e) => {
                onChange(e, "name");
              }}
              type={"text"}
            />
            <Input
              label={"Code"}
              onChange={(e) => {
                onChange(e, "code");
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
