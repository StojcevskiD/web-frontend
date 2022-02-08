import {Card, CardBody} from "reactstrap";
import {FaBookReader} from 'react-icons/fa';

const Register = () => {


    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            loginHandler()
        }
    }

    const loginHandler = () => {

    }

    return (
        <div onKeyPress={handleKeyPress}>
            <div className="container login_positions">
                <div className="row ">
                    <div className="col ">
                        <Card id="login_card">
                            <div className="row">
                                <h1 id="login_title">Register</h1>
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
                                    <div className="row login_password_input login_form_element">
                                        <input name="password" type="password" className="form-control "
                                               placeholder="Repeat Password"/>
                                    </div>
                                    <div className="row login_form_element" id="login_btn_div">
                                        <a className="btn login_form_element btn-success form-control login_btn "
                                           href={'/login'}>Log in</a>
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

export default Register
