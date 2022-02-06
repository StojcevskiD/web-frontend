import {Card, CardBody} from "reactstrap";
import CardHeader from "@material-ui/core/CardHeader";
import './Login.css'
import { FaBookReader } from 'react-icons/fa';

const Login = () => {


    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            loginHandler()
        }
    }

    const loginHandler = () => {

    }

    return (
        <div onKeyPress={handleKeyPress}>
            <div className="container">
                <div className="login-container">
                <div className="row">
                    <div className="col">
                        <Card>
                            <div className="row">
                                <CardHeader id="login-title" title={"Log In"}/>
                                <FaBookReader id="icon-reader"></FaBookReader>
                            </div>
                            <CardBody>
                                <form>
                                    <div className="row">
                                        <input name="username" type="text" className="form-control"
                                               placeholder="Enter Email"/>
                                    </div>
                                    <div className="row">
                                        <input name="password" type="password" className="form-control"
                                               placeholder="Enter Password"/>
                                    </div>
                                    <div className="">
                                        <a style={{marginLeft: "40%"}} href={'/reset/password'}>Forgot Password?</a>
                                    </div>
                                    <div className="row">
                                        <button type="button" className="form-control logIn-Btn"
                                                onClick={loginHandler}>Log in
                                        </button>
                                    </div>
                                </form>
                                <div className="row">
                                    <a className="btn btn-success form-control register-Btn" href={'/register'}>Register</a>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login
