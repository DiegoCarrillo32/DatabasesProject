import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { useForm } from "../../hooks/useForm";
import "./Register.css";
export const Register = () => {
  const [onChange, Form] = useForm({nombre:"", apellido1:"", apellido2:"", correo:"", contrasena:""})
  const nav = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault();
    if(Form.contrasena.length < 9) {
      toast.error("La contraseña debe tener mas de 9 caracteres")
      return;
    }
    console.log(Form);   
    fetch('http://127.0.0.1:5000/create_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Form)
    }).then( () => {
      toast.success("Registrado correctamente!")
      nav('/login')

    } )
    
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
              onChange={(e) => onChange(e, "nombre")}
            />
          
          <Input
              label={"Apellido Paterno"}
              type={"text"}
              onChange={(e) => onChange(e, "apellido1")}
            />
          
          <Input
              label={"Apellido Materno"}
              type={"text"}
              onChange={(e) => onChange(e, "apellido2")}
            />
          
          
          <Input
              label={"Correo electronico"}
              type={"email"}
              onChange={(e) => onChange(e, "correo")}
            />

          <Input
              label={"Contraseña"}
              type={"password"}
              onChange={(e) => onChange(e, "contrasena")}
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
