import {Card, CardBody} from "reactstrap";
import CardHeader from "@material-ui/core/CardHeader";
import './Login.css'


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
                <div className="row">
                    <div className="col">
                        <Card>
                            <div className="row">
                                <CardHeader title={"Log In"}/>
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
                                    <div className="row">
                                        <button type="button" className="form-control"
                                                onClick={loginHandler}>Log in
                                        </button>
                                    </div>
                                </form>
                                <div className="">
                                    <a href={'/reset/password'}>Forgot Password?</a>
                                    <a href={'/register'}>Register</a>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
