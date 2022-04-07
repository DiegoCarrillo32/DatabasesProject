import { Login } from './containers/Login/Login';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { NotFound } from './containers/NotFound/NotFound';
import { Dashboard } from './containers/Dashboard/Dashboard';
import './App.css'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path='profile' element={<h1>Perfil</h1>}></Route>
            <Route path='main' element={<h1>activos</h1>}></Route>
          </Route>
          <Route path='/*' element={<NotFound />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
