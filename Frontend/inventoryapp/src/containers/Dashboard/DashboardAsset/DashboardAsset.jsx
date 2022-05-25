import React,  { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, TableCell } from "@mui/material";
import Modal from '@mui/material/Modal';
import toast from "react-hot-toast";

import { Input } from "../../../components/Input/Input";
import { Button as Btn }from "../../../components/Button/Button";
import { useForm } from "../../../hooks/useForm";
const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
export const DashboardAsset = () => {
     
  const [Assets, setAssets] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const columns = [
  { field: 'area_nombre', headerName: 'Area Nombre', width: 200 },
  { field: 'id_ubicacion', headerName: 'Ubicacion del activo', width: 200 },
  { field: 'placa', headerName: 'Placa del activo', width: 200 },
  { field: 'descripcion', headerName: 'Desc del activo', width: 200 },
  { field: 'garantia', headerName: 'Garantia del activo', width: 200 },
  { field: 'set_loan', headerName: 'Crear prestamo activo', width: 200, renderCell: (row) => (<Button onClick={() => { console.log(row['row'].id); }}>Crear prestamo</Button>) },

  {
    field: 'add_activo',
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
          Agregar activo
        </Button>
    ),
  },
];
  useEffect(() => {
    fetch('http://127.0.0.1:5000/assets')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const rows = data.map((asset) => {
        return {
          id:asset.id_activo,
          area_nombre: asset.area_nombre,
          id_ubicacion: asset.id_ubicacion,
          placa: asset.tipo.placa,
          descripcion: asset.tipo.descripcion,
          garantia: asset.tipo.garantia,
        }
      })
      setAssets(rows);
    })
  }, [])

  const [onChange, Form] = useForm({ area_nombre: "", placa: "", id_ubicacion: "", descripcion: "", garantia: "" });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(Form);
    fetch('http://127.0.0.1:5000/create_asset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Form)
    }).then( () => {
      handleClose();
      toast.success('Agregado correctamente!')
    })
  };

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={Assets}
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
              <Btn type={"submit"} title={"Agregar"} herarchy={"primary"} />
          </form>
        
        </Box>
      </Modal>
    </>
    
  )
}
