import React from "react";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { useForm } from "../../hooks/useForm";
import "./Register.css";
export const Register = () => {
  const [onChange, Form] = useForm({name:"", lastname:"", id:"", email:""})

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(Form);    
  };
  
  return (
    <div className='register-container'>
      <div className='right' />
      <div className='left'>
        <form className='form' onSubmit={onSubmit}>
          <h1>Crea tu cuenta</h1>
          <p className='top_p'>
            Tú serás el único administrador de la institución que crees
          </p>
          <Input
              label={"Nombre"}
              type={"text"}
              onChange={(e) => onChange(e, "name")}
            />
          
          
          <Input
              label={"Apellido"}
              type={"text"}
              onChange={(e) => onChange(e, "lastname")}
            />
          
          <Input
              label={"Cédula"}
              type={"text"}
              onChange={(e) => onChange(e, "id")}
            />
          
          
          <Input
              label={"Correo electronico"}
              type={"email"}
              onChange={(e) => onChange(e, "email")}
            />
          
          <Button
              herarchy={"primary"}
              title={"Continuar"}
              type={"submit"}
            />
          
        </form>
      </div>
    </div>
  );
};
