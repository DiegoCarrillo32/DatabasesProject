import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from "@mui/material";
import Modal from '@mui/material/Modal';
import toast from "react-hot-toast";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "react-datepicker/dist/react-datepicker.css";

import { Input } from "../../../components/Input/Input";
import { Button as Btn } from "../../../components/Button/Button";
import { useForm } from "../../../hooks/useForm";
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

export const DashboardAsset = () => {

  const [Assets, setAssets] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [onChange, Form] = useForm({ id_area: "", placa: "", id_ubicacion: "", descripcion: "", garantia: "", nombre_activo: "" });

  const [Location, setLocation] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [Area, setArea] = useState([]);


  const handleChange = (event) => {
    setSelectedLocation(event.target.value);
  };
  const handleChangeArea = (event) => {
    setSelectedArea(event.target.value);
  };
  const onSubmitLoan = (row) => {
    
    
    const user_info = localStorage.getItem('user_info')
    const user_info_json = JSON.parse(user_info)

    const data = {
      id_activo: row['row'].id,
      id_usuario: user_info_json.id,

    }

    fetch('http://127.0.0.1:5000/create_loan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        toast.success("Se ha registrado el prestamo");
      }
      )
      .catch(err => toast.error("Error al registrar el prestamo, posiblemente el activo ya esta prestado"));

  }

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
          Agregar activo
        </Button>
      ),
    },
    { field: 'nombre_activo', headerName: 'Nombre Activo', width: 200 },
    { field: 'id_area', headerName: 'Area', width: 200 },
    { field: 'id_ubicacion', headerName: 'Ubicacion del activo', width: 200 },
    { field: 'placa', headerName: 'Placa del activo', width: 200 },
    { field: 'descripcion', headerName: 'Desc del activo', width: 200 },
    { field: 'garantia', headerName: 'Garantia del activo', width: 200 },
    { field: 'set_loan', headerName: 'Crear prestamo activo', width: 200, renderCell: (row) => (<Button onClick={() => { onSubmitLoan(row) }}>Crear prestamo</Button>) },
  ];
  useEffect(() => {
    const user_info = localStorage.getItem('user_info')
    const user_info_json = JSON.parse(user_info)

    fetch(`http://127.0.0.1:5000/assets/${user_info_json.id_institucion}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const rows = data.map((asset) => {
          return {
            id: asset.id_activo,
            nombre_activo: asset.nombre_activo,
            id_area: asset.area.nombre,
            id_ubicacion: asset.ubicacion.nombre,
            placa: asset.tipo.placa,
            descripcion: asset.tipo.descripcion,
            garantia: asset.tipo.garantia,
          }
        })
        setAssets(rows);
      })
  }, [])


  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      id_area: selectedArea,
      id_ubicacion: selectedLocation,
      nombre_activo: Form.nombre_activo,
      placa: Form.placa,
      descripcion: Form.descripcion,
      garantia: Form.garantia,
    }

    fetch(`http://127.0.0.1:5000/create_asset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(async (res) => {

      handleClose();
      toast.success('Agregado correctamente!')
    })
  };
  useEffect(() => {
    const user_info = localStorage.getItem('user_info')
    const user_info_json = JSON.parse(user_info)
    fetch(`http://127.0.0.1:5000/locations/${user_info_json.id_institucion}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);

        setLocation(data);
      }
      )
  }, [])

  useEffect(() => {

    const user_info = localStorage.getItem('user_info')
    const user_info_json = JSON.parse(user_info)

    fetch(`http://127.0.0.1:5000/areas/${user_info_json.id_institucion}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setArea(data);
      })
  }, [])

  return (
    < >
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
              label={"Nombre de activo"}
              onChange={(e) => {
                onChange(e, "nombre_activo");
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

            <FormControl variant="standard" sx={{ m: 2, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Ubicacion</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectedLocation}
                onChange={handleChange}
                label="Ubicacion"
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {
                  Location.map((location) => {
                    return (
                      <MenuItem value={location.id_ubicacion}>{`${location.nombre}`} </MenuItem>
                    )
                  })
                }

              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 2, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Area</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectedArea}
                onChange={handleChangeArea}
                label="Area"
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {
                  Area.map((area) => {
                    return (
                      <MenuItem value={area.id_area}>{`${area.nombre}`} </MenuItem>
                    )
                  })
                }

              </Select>
            </FormControl>
            <Btn type={"submit"} title={"Agregar"} herarchy={"primary"} />
          </form>

        </Box>
      </Modal>

    </>

  )
}
