import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal } from '@mui/material';
import { Box } from '@mui/system';
import toast from 'react-hot-toast';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

import { Button as Btn } from "../../../components/Button/Button";
import { Input } from '../../../components/Input/Input';
import { useForm } from '../../../hooks/useForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'aliceblue',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const DashboardLocation = () => {

  const [Location, setLocation] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [onChange, Form] = useForm({ nombre: "", detalle: "" });

  const columns = [
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
          onClick={handleOpen}
        >
          Agregar Ubicación
        </Button>
      ),
    },
    { field: 'nombre', headerName: 'Nombre de la ubicacion', width: 200 },
    { field: 'detalle', headerName: 'Detalle', width: 200 },
    { field: 'id_ubicacion', headerName: 'Id de la ubicacion', width: 200 },
    { field: 'delete_ubicacion', headerName: 'Eliminar ubicacion', width: 200, renderCell: (row) => (<button style={{ background: 'none' }} onClick={() => { onDelete(row) }} > <CloseIcon></CloseIcon></button>) },
    { field: 'edit_ubicacion', headerName: 'Editar ubicacion', width: 200, renderCell: (row) => (<EditIcon></EditIcon>) },


  ];

  const onDelete = (row) => {
    console.log(row.id);
    toast(
      (t) => (
        <span>
          Desea eliminar la ubicacion?
          <button onClick={() => {
            fetch(`http://127.0.0.1:5000/delete_location/${row.id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              }
            })
              .then(res => res.json())
              .then(res => {
                console.log(res);
                toast.dismiss(t.id);
                toast.success('Ubicacion eliminada');
              }
              ).catch(err => {
                
                toast.dismiss(t.id);
                toast.error('Error al eliminar la ubicacion');
              })
          }}>Eliminar</button>
          <button onClick={() => toast.dismiss(t.id)}>Cancelar</button>
        </span>
      )

    );

  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(Form);
    const data = {
      nombre: Form.nombre,
      detalle: Form.detalle,
    }
    fetch(`http://127.0.0.1:5000/create_location`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {

        if (data.msg === "error") {
          toast.error("Error al crear la ubicacion");
        } else {
          toast.success("Ubicacion creada con exito");
          handleClose();
        }

      })
      .catch(err => toast.error("Error al crear la ubicacion"));
  }
  useEffect(() => {
    fetch('http://127.0.0.1:5000/locations')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const rows = data.map((location) => {
          return {
            id: location.id_ubicacion,
            id_ubicacion: location.id_ubicacion,
            nombre: location.nombre,
            detalle: location.detalle
          }
        })
        setLocation(rows);
      }
      )
  }, [])
  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={Location}
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
              label={"Nombre de la ubicacion"}
              onChange={(e) => {
                onChange(e, "nombre");
              }}
              type={"text"}
            />
            <Input
              label={"Detalle de la ubicacion"}
              onChange={(e) => {
                onChange(e, "detalle");
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
