import { Login } from './containers/Login/Login';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { NotFound } from './containers/NotFound/NotFound';
import { Dashboard } from './containers/Dashboard/Dashboard';
import './App.css'
import { Register } from './containers/Register/Register';
import { DashboardMain } from './containers/Dashboard/DashboardMain/DashboardMain';

import { Toaster } from 'react-hot-toast';
import { DashboardProfile } from './containers/Dashboard/DashboardProfile/DashboardProfile';
import { DashboardAsset } from './containers/Dashboard/DashboardAsset/DashboardAsset';
import { DashboardLoan } from './containers/Dashboard/DashboardLoan/DashboardLoan';

function App() {
  return (
    <div className='main-container'>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path='main' element={<DashboardProfile />}></Route>
            <Route path='users' element={<DashboardMain />}></Route>
            <Route path='assets' element={<DashboardAsset />}></Route>
            <Route path='loans' element={<DashboardLoan />}></Route>
          </Route>
          <Route path='/*' element={<NotFound />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
