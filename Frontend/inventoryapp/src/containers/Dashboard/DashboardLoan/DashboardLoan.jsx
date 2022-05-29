import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box } from "@mui/material";
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Input } from "../../../components/Input/Input";
import { Button as Btn } from "../../../components/Button/Button";
import { useForm } from "../../../hooks/useForm";
import toast from 'react-hot-toast';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export const DashboardLoan = () => {

  const [Loans, setLoans] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'estado', headerName: 'Estado', width: 200 },
    { field: 'fecha_de', headerName: 'Fecha de devolucion', width: 200 },
    { field: 'fecha_so', headerName: 'Fecha de solicitud', width: 200 },
    { field: 'id_activo', headerName: 'ID del activo', width: 200 },
    { field: 'id_prestamo', headerName: 'ID del prestamo', width: 200 },
    {
      field: 'delete_loan', headerName: 'Eliminar prestamo', width: 200, renderCell: (row) => (<button style={{ background: 'none' }} onClick={() => {

        toast(
          (t) => (
            <span>
              Desea eliminar el prestamo?
              <button onClick={() => {
                fetch(`http://127.0.0.1:5000/delete_loan`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    id_prestamo: row.id
                  })
                })
                  .then(res => res.json())
                  .then(res => {
                    console.log(res);
                    toast.dismiss(t.id);
                    toast.success('Prestamo eliminada');

                  }
                  ).catch(err => {

                    toast.dismiss(t.id);
                    toast.error('Error al eliminar el prestamo');
                  })

              }}>Eliminar</button>
              <button onClick={() => toast.dismiss(t.id)}>Cancelar</button>
            </span>
          )

        );
      }} > <CloseIcon></CloseIcon></button>)
    },

  ];
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user_info'));
    fetch(`http://127.0.0.1:5000/loans/${user.id_institucion}`)
      .then(res => res.json())
      .then(data => {
        const rows = data.map((loan, index) => {
          return {
            id: loan.id_prestamo,
            estado: loan.estado ? 'Prestado' : 'Devuelto',
            fecha_de: loan['fecha_de'],
            fecha_so: loan['fecha_so'],
            id_activo: loan.id_activo,
            id_prestamo: loan.id_prestamo,


          }
        })
        setLoans(rows);
      })
  }, [])

  const [onChange, Form] = useForm({ area_nombre: "", placa: "", id_ubicacion: "", descripcion: "", garantia: "" });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(Form);
    //   fetch('http://127.0.0.1:5000/create_asset', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(Form)
    //   }).then( () => {
    //     handleClose();
    //     toast.success('Agregado correctamente!')
    //   })
  };

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={Loans}
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
  );
}
