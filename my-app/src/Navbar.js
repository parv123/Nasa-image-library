import React, { useState} from "react";
import './App.css';
//import { Navbar } from 'react-bootstrap';
import nasa from './nasa.png'
function Navbar() {
return(
    <nav className="navbar navbar-dark x">
        <a className="anav navbar-brand" href=""><img style ={{height:'40px'}}src={nasa}></img> <span id="below">IMAGE LIBRARY</span></a></nav>
);
}
export default Navbar;