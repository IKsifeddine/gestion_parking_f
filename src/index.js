import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './GestionParking-FrontEnd/login';
// import { BrowserRouter } from 'react-router-dom';
// import Datafruits from './PreparationRegoinal/fruits/datafruits';
// import Testtest from './GestionParking-FrontEnd/testtest';
import ParkingDetail from './components/ParkingDetail';
import ParkingSearch from './components/ParkingSearch';
import Home from './components/Homepage';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Addstat from './components/AjouteStat';
import ExpensePage from './components/Searchstat';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<Router>
      
      <Routes>

        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/addstat" element={<Addstat/>} />
        <Route path="/mes_stationnements" element={<ExpensePage/>} />

        <Route path="parkingsearch" element={<ParkingSearch/>} />
        <Route path="parking/:id" element={<ParkingDetail />} />
      </Routes>
    </Router>
);

