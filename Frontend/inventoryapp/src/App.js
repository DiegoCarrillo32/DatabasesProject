import { Login } from './containers/Login/Login';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { NotFound } from './containers/NotFound/NotFound';
import { Dashboard } from './containers/Dashboard/Dashboard';
import { Register } from './containers/Register/Register';
import { DashboardProfile } from './containers/Dashboard/DashboardProfile/DashboardProfile';
import { DashboardAsset } from './containers/Dashboard/DashboardAsset/DashboardAsset';
import { DashboardLoan } from './containers/Dashboard/DashboardLoan/DashboardLoan';
import { DashboardArea } from './containers/Dashboard/DashboardArea/DashboardArea';
import { DashboardLocation } from './containers/Dashboard/DashboardLocation/DashboardLocation';
import { DashboardUser } from './containers/Dashboard/DashboardUser/DashboardUser';
import { DashboardMain } from './containers/Dashboard/DashboardMain/DashboardMain';
import { DashboardMessage } from './containers/Dashboard/DashboardMessage/DashboardMessage';
import './App.css'

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
            <Route path='' element={<DashboardMain />}></Route>
            <Route path='main' element={<DashboardProfile />}></Route>
            <Route path='users' element={<DashboardUser />}></Route>
            <Route path='assets' element={<DashboardAsset />}></Route>
            <Route path='loans' element={<DashboardLoan />}></Route>
            <Route path='areas' element={<DashboardArea />}></Route>
            <Route path='locations' element={<DashboardLocation />}></Route>
            <Route path='messages' element={<DashboardMessage />}></Route>
          </Route>
          <Route path='/*' element={<NotFound />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
