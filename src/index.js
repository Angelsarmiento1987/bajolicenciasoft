import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Home } from './Views/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";//uso hashrouter en lugar de browserroutes para que github lo reconozca cuando lo suba a otro host deberia poner browseer router o hacer la programacion para q reconozca la app cuando debe usar browser o hash dependiendo el entorno donde se deploye
import { LecturaCancion } from './Views/LecturaCancion/LecturaCancion';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <Router >
      <Routes>
        <Route path="/" element={<Home />} />
       
      </Routes>
      <Routes>
        <Route path="/lecturacancion" element={<LecturaCancion />} />
       
      </Routes>
    </Router>
  </React.StrictMode>
);


