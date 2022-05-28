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

export const DashboardUser = () => {

    const [open, setOpen] = useState(false);
    const [User, setUser] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [onChange, Form] = useForm({ nombre: "", correo: "", contrasena:"", apellido1:"", apellido2:""});

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
                    Agregar Usuario
                </Button>
            ),
        },
        { field: 'nombre', headerName: 'Nombre del usuario', width: 200 },
        { field: 'apellido1', headerName: 'Apellido', width: 200 },
        { field: 'apellido2', headerName: 'Apellido', width: 200 },
        { field: 'correo', headerName: 'Correo', width: 200 },
        { field: 'id_usuario', headerName: 'Id del usuario', width: 200 },
        { field: 'delete_ubicacion', headerName: 'Eliminar usuario', width: 200, renderCell: (row) => (<button style={{ background: 'none' }} onClick={() => { }} > <CloseIcon></CloseIcon></button>) },
        { field: 'edit_ubicacion', headerName: 'Editar usuario', width: 200, renderCell: (row) => (<EditIcon></EditIcon>) },


    ];

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(Form);
        const user_info = localStorage.getItem('user_info')
        const user_info_json = JSON.parse(user_info)
        const data = {
            nombre: Form.nombre,
            correo: Form.correo,
            contrasena: Form.contrasena,
            apellido1: Form.apellido1,
            apellido2: Form.apellido2,
            id_institucion: user_info_json.id_institucion
        }
        console.log(data);
        fetch('http://127.0.0.1:5000/create_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

            .then(res => res.json())
            .then(data => {
                console.log(data);
                
                toast.success('Usuario creado');
                handleClose();
            }
            )
            .catch(err => {
                toast.error('Error al crear el usuario');
                handleClose();
            }
            )
    }

    useEffect(() => {
        fetch('http://127.0.0.1:5000/get_users')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const rows = data.map((user) => {
                    return {
                        id: user.id_usuario,
                        nombre: user.name,
                        apellido1: user.lastname1,
                        apellido2: user.lastname2,
                        correo: user.correo,
                        id_usuario: user.id_usuario,
                    }
                })
                setUser(rows);
            }
            )


    }, [])



    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={User}
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
                            label={"Nombre del usuario"}
                            onChange={(e) => {
                                onChange(e, "nombre");
                            }}
                            type={"text"}
                        />
                        <Input
                            label={"Apellido 1 del usuario"}
                            onChange={(e) => {
                                onChange(e, "apellido1");
                            }}
                            type={"text"}
                        />
                        <Input
                            label={"Apellido 2 del usuario"}
                            onChange={(e) => {
                                onChange(e, "apellido2");
                            }}
                            type={"text"}
                        />
                        <Input
                            label={"Correo del usuario"}
                            onChange={(e) => {
                                onChange(e, "correo");
                            }}
                            type={"text"}
                        />
                       
                        <Input
                            label={"Contraseña del usuario"}
                            onChange={(e) => {
                                onChange(e, "contrasena");
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
