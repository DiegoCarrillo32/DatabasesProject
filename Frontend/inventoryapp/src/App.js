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
function App() {
  return (
    <div className='main-container'>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path='profile' element={<h1>Perfil</h1>}></Route>
            <Route path='main' element={<DashboardMain/>}></Route>
          </Route>
          <Route path='/*' element={<NotFound />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
