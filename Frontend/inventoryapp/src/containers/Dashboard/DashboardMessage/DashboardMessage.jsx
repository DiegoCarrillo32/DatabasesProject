import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';


export const DashboardMessage = () => {
  
  const [messages, setMessages] = useState([]);



  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.subject}
          </TableCell>
          <TableCell align=""> { open ? 
                                            <Button onClick={()=>{setOpen(!open)}}>Cerrar mensaje</Button> :
                                            <Button onClick={()=>{setOpen(!open)}}>Abrir mensaje</Button> } 
          </TableCell>
          <TableCell align="">{row.nombre_remi === "" ? "Administracion": `${row.nombre_remi} ${row.apellido_remi}`}</TableCell>
          <TableCell align="">{`${row.nombre_desti} ${row.apellido_desti}`}</TableCell>
          
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  {row.subject}
                </Typography>
                <Divider/>
                <p>{row.content}</p>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user_info'))
    fetch(`http://127.0.0.1:5000/messages/${user.id}`,

      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

      .then(res => res.json())
      .then(data => {
        console.log(data)
        setMessages(data);

      }
      )
  }, [])


  return (
    <>
      <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Asunto</TableCell>
            <TableCell align="center">Contenido</TableCell>
            <TableCell align="">Remitente</TableCell>
            <TableCell align="">Destinatario</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map((message) => (
            <Row key={message.id_mensaje} row={message} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}
