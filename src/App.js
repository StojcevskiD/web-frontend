import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom"
import {Redirect, Routes} from "react-router-dom";
import MainPage from "./components/MainPage";

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
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                </Routes>
            </Router>
        )
    }

}

export default App;
