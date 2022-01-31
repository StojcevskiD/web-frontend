import './App.css';
import './assets/general.css'
import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom"
import {Redirect, Routes} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Subject from "./components/Subject/Subject";

class App extends Component {

    render() {
        return (
            <div>
                {this.adminRoutes()}
            </div>
        )
    }

    adminRoutes = () => {

        return (
            <Router>
                <NavBar/>

                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/subject/:id' element={<Subject/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </Router>
        )
    }

}

export default App;
