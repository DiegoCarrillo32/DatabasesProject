import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Components
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useForm } from "../../hooks/useForm";
import toro from "../../assets/toro.png";
import "./Login.css";
import toast from "react-hot-toast";
export const Login = () => {
  const navigate = useNavigate()
  const [onChange, Form] = useForm({contrasena:"", correo:""})


  const onSubmit = (e) => {
    e.preventDefault();
    console.log(Form);
    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Form)
    }).then( async (res) => {
      const data = await res.json();
      if(data.msg === "error"){
        toast.error("Usuario o contraseña incorrectos")
      }else{

        toast.success("Iniciaste sesión correctamente!")
        
        localStorage.setItem("user_info", JSON.stringify(data))
        console.log(data);
        navigate('/dashboard')
      }
    }
    ).catch(() => {
      toast.error("Usuario o contraseña incorrectos")
    }
    )
  };
  return (
    <div className='container'>
      <div className='login'>
        <img src={toro} display='block' width='150px' alt='LogoToro' />
        <div className='logincontainer'>
          <h1>Inicia sesión en tu cuenta</h1>
          <p>
            o <Link to={"/dashboard"}>contacta con el administrador</Link>
          </p>
          <form onSubmit={onSubmit} id='loginform'>
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
            <Link to={"/dashboard"}>¿Olvidaste tu contraseña?</Link>
            <Button
              herarchy={"primary"}
              title={"Iniciar Sesión"}
              type={"submit"}
            />
          </form>
        </div>
        <div className='buttoncontainer'>
          <Link to={'/register'}>
            <Button
              herarchy={"secondary"}
              title={"Registrar Institución"}
            />
          </Link> 
        </div>
      </div>
      <div className='image'></div>
    </div>
  );
};
