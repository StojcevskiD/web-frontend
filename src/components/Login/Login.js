import {Card, CardBody} from "reactstrap";
import './Login.css'
import {FaBookReader} from 'react-icons/fa';

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
                <div className="row ">
                    <div className="col login_positions">
                        <Card id="login_card">
                            <div className="row">
                                <h1 id="login_title">Log In</h1>
                                <FaBookReader size="35" id="login_reader_icon"/>
                            </div>
                            <CardBody>
                                <form id="login_form">
                                    <div className="row login_form_element">
                                        <input name="username" type="text" className="form-control "
                                               placeholder="Enter Email"/>
                                    </div>
                                    <div className="row login_password_input login_form_element">
                                        <input name="password" type="password" className="form-control "
                                               placeholder="Enter Password"/>
                                    </div>
                                    <div className="row login_form_element" id="login_btn_div">
                                        <button type="button" className="form-control login_btn"
                                                onClick={loginHandler}>Log in
                                        </button>
                                    </div>
                                    <div className="row login_form_element">
                                        <a className="btn btn-success form-control login_register_btn "
                                           href={'/register'}>Register</a>
                                    </div>
                                </form>

                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
