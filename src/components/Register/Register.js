import {Card, CardBody} from "reactstrap";
import {FaBookReader} from 'react-icons/fa';
import React, {useState} from "react";
import UserService from "../../repository/UserRepository";
import Swal from "sweetalert2";


const Register = () => {

    const [data, setData] = React.useState({
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
        repeatPassword: '',
        address: '',
        phone: ''
    });

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            registerHandler()
        }
    }

    const updateData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })

    }

    const registerHandler = () => {
        if (data.name !== '' && data.surname !== '' && data.email !== '' && data.username !== '' && data.password !== ''
            && data.repeatPassword !== '' && data.address !== '' && data.phone !== '') {
            if (data.password === data.repeatPassword) {
                let formData = {
                    'username': data.username,
                    'name': data.name,
                    'surname': data.surname,
                    'address': data.address,
                    'phone': data.phone,
                }
                UserService.register(data.email, data.password, formData).then(() => {
                    window.location.href = "/login"
                }).catch(() => {
                    Swal.fire(
                        'Грешка!',
                        'Е-поштата веќе постои.',
                        'error'
                    )
                })
            } else {
                Swal.fire(
                    'Грешка!',
                    'Лозинките не се совпаѓаат.',
                    'error'
                )
            }
        } else {
            Swal.fire(
                'Грешка!',
                'Пополнете ги сите полиња.',
                'error'
            )
        }
    }

    return (
        <div onKeyPress={handleKeyPress}>
            <div className="container login_positions">
                <div className="row ">
                    <div className="col ">
                        <Card id="login_card">
                            <div className="row">
                                <h1 id="login_title">Регистрирај се</h1>
                                <FaBookReader size="35" id="login_reader_icon"/>
                            </div>
                            <CardBody>
                                <form id="login_form">
                                    <div className="row login_form_element">
                                        <input name="name" type="text" className="form-control "
                                               placeholder="Внесете име" onChange={updateData} required/>
                                    </div>
                                    <div className="row login_password_input login_form_element">
                                        <input name="surname" type="text" className="form-control "
                                               placeholder="Внесете презиме" onChange={updateData} required/>
                                    </div>
                                    <div className="row login_password_input login_form_element">
                                        <input name="email" type="text" className="form-control "
                                               placeholder="Внесете е-пошта" onChange={updateData} required/>
                                    </div>
                                    <div className="row login_password_input login_form_element">
                                        <input name="username" type="text" className="form-control "
                                               placeholder="Внесете корисничко име" onChange={updateData} required/>
                                    </div>
                                    <div className="row login_password_input login_form_element">
                                        <input name="password" type="password" className="form-control "
                                               placeholder="Внесете лозинка" onChange={updateData} required/>
                                    </div>
                                    <div className="row login_password_input login_form_element">
                                        <input name="repeatPassword" type="password" className="form-control "
                                               placeholder="Повторете ја лозинката" onChange={updateData} required/>
                                    </div>
                                    <div className="row login_password_input login_form_element">
                                        <input name="address" type="text" className="form-control "
                                               placeholder="Внесете адреса на живеење" onChange={updateData} required/>
                                    </div>
                                    <div className="row login_password_input login_form_element">
                                        <input name="phone" type="text" className="form-control "
                                               placeholder="Внесете телефонски број" onChange={updateData} required/>
                                    </div>

                                    <div className="row login_form_element mt-4">
                                        <a className="btn btn-success form-control login_register_btn "
                                           onClick={registerHandler}>Регистрирај се</a>
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
