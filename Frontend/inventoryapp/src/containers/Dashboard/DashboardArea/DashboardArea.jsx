import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal } from '@mui/material';
import { Box } from '@mui/system';

import { Button as Btn }from "../../../components/Button/Button";
import { Input } from '../../../components/Input/Input';
import { useForm } from '../../../hooks/useForm';
import toast from 'react-hot-toast';

const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'aliceblue',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const DashboardArea = () => {
    const [ Area , setArea ] = useState([]);
    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [onChange, Form] = useForm({ nombre: "", logo: "", encargado: ""});

const columns = [
  {
      field: 'add_area',
      type: 'string',
      width: 200,
      renderHeader: () => (
        <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={ handleOpen }
          >
            Agregar area
          </Button>
      ),
    },    
    { field: 'nombre', headerName: 'Nombre del area', width: 200 },
    { field: 'encargado', headerName: 'Nombre del encargado', width: 200 },
    { field: 'id_area', headerName: 'Id del area', width: 200 },

  ];
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(Form);
    
    const user_info = localStorage.getItem('user_info')
    const user_info_json = JSON.parse(user_info)
    const data = {
        nombre: Form.nombre,
        encargado: Form.encargado,
        id_institucion: user_info_json.id_institucion,
        logo: Form.logo
  }
    console.log(data);
    fetch('http://127.0.0.1:5000/create_area', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then( async (res) => {
        const data = await res.json();
        if(data.msg === "error"){
        toast.error("Error al crear el area");
    }else {
        toast.success("Area creada correctamente");
        handleClose();
    }
    })
}


    useEffect(() => {
        fetch('http://127.0.0.1:5000/areas')
        .then(res => res.json())
        .then(data => {
            console.log(data);
          const rows = data.map((area) => {
            return {
                id:area.id_area,
                id_area:area.id_area,
                nombre: area.nombre,
                encargado: `${area.encargado.nombre} ${area.encargado.apellido1} ${area.encargado.apellido2}`,
 
            }
          })
          setArea(rows);
        })
      }, [])

  return (
    <>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={Area}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={onSubmit}>
          <Input
                label={"Nombre del area"}
                onChange={(e) => {
                  onChange(e, "nombre");
                }}
                type={"text"}
              />
          <Input
                label={"Link del logo"}
                onChange={(e) => {
                  onChange(e, "logo");
                }}
                type={"text"}
              />
          <Input
                label={"ID del encargado"}
                onChange={(e) => {
                  onChange(e, "encargado");
                }}
                type={"text"}
              />
            <Btn type={"submit"} title={"Agregar"} herarchy={"primary"} />
          </form>
        </Box>
      </Modal>

    
  </>
  )
}
