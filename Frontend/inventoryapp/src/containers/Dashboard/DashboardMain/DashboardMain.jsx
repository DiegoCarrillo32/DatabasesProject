import React from "react";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import "./DashboardMain.css";

const routes = [
  {
    name: 'Usuarios',
    route: 'users',
    icon: () => <PersonIcon sx={{fontSize:50}}/>
  },
  {
    name: 'Activos',
    route: 'assets',
    icon: () => <WebAssetIcon sx={{fontSize:50}}/>
  },
  {
    name: 'Prestamos',
    route: 'loans',
    icon: () => <CreditScoreIcon sx={{fontSize:50}}/>
  },
  {
    name: 'Areas',
    route: 'areas',
    icon: () => <CropOriginalIcon sx={{fontSize:50}}/>
  },
  {
    name: 'Ubicaciones',
    route: 'locations',
    icon: () => <LocationOnIcon sx={{fontSize:50}}/>
  },
  {
    name: 'Mensajes',
    route: 'messages',
    icon: () => <EmailIcon sx={{fontSize:50}}/>
  },
]

export const DashboardMain = () => {

  return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: 0,
      }}>

        
        {
          routes.map((route) => (
            <Link to={`${route.route}`} style={{
              textDecoration: 'none',
              color: 'inherit'

            }} >
                <Card class='card' sx={{ m:5, width:300, height:300, }}>
                  <CardContent style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent:'center' ,
                    alignItems:'center', 
                    height: '100%'
                  }}>
                    {route.icon()}
                    <Typography sx={{ fontSize: 28 }} color="text.secondary">
                      {route.name}
                    </Typography>
                  </CardContent>
                </Card>
            </Link>

          ))
        }

      </div>
    
  );
};
