import {Card, CardBody} from "reactstrap";
import {FaBookReader} from 'react-icons/fa';
import React, {useRef, useState} from "react";
import UserService from "../../repository/UserRepository";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";
import './ForgotPassword.css'


const ForgotPassword = () => {
    const {t} = useTranslation('lang')
    const inputRef = useRef()

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit()
        }
    }

    const handleSubmit = () => {
        UserService.resetPassword(inputRef.current.value).then(r => {

        }).catch(() => {
            Swal.fire(
                'Грешка!',
                'Барањето е неуспешно пратено. Обидете се повторно.',
                'error'
            )
        })
    }

    return (
        <div onKeyPress={handleKeyPress}>
            <div className="container login_positions">
                <div className="row ">
                    <div className="col ">
                        <Card id="login_card">
                            <div className="row">
                                <h1 id="login_title">{t('FORGOT_PASSWORD')}</h1>
                                <FaBookReader size="35" id="login_reader_icon"/>
                            </div>
                            <CardBody>
                                <form id="login_form">
                                    <div className="row login_form_element">
                                        <input name="name" type="text" className="form-control"
                                               placeholder={t('INPUT_EMAIL')} ref={inputRef}
                                               required/>
                                    </div>
                                    <div className="row login_form_element mt-4">
                                        <a className="btn btn-success form-control login_register_btn "
                                           onClick={handleSubmit}>{t('SEND')}</a>
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

export default ForgotPassword
