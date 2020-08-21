import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "react-bootstrap/Navbar";
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

 export default class App extends React.Component {render(){return(
<Navbar collapseOnSelect expand="lg" bg="primary" variant="dark"><Navbar.Brand>inventario</Navbar.Brand> 
<Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
<Navbar.Collapse id="responsive-navbar-nav"><Nav className="mr-auto">
<Nav.Link>inicio</Nav.Link><Nav.Link>Buscar</Nav.Link><Nav.Link>Ayuda</Nav.Link>
</Nav></Navbar.Collapse>
</Navbar>
 )}}