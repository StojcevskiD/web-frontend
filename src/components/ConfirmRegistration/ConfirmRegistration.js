import {Card, CardBody} from "reactstrap";
import {FaBookReader} from 'react-icons/fa';
import React, {useEffect, useRef, useState} from "react";
import UserService from "../../repository/UserRepository";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import '../ForgotPassword/ForgotPassword.css'


const ConfirmRegistration = () => {
    const {t} = useTranslation('lang')
    const navigate = useNavigate()
    const param = new URLSearchParams(useLocation().search).get('token')
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        UserService.enableUser(param).then(() => {
            setSuccess(true)
        }).catch(() => {
            setSuccess(false)
        })
    }, [param])

    const toLogin = () => {
        navigate('/login')
    }

    return (
        <div className="container login_positions">
            <div className="row">
                <div className="col ">
                    <Card id="login_card">
                        <CardBody>
                            <form id="login_form">
                                {success === null ? null : success === true ?
                                    <div>
                                        <h2 className="confirm_success_header">{t('ENABLE_SUCCESS')}</h2>
                                    </div> :
                                    <div>
                                        <h2 className="confirm_failed_header">{t('ENABLE_FAILED')}</h2>
                                    </div>
                                }

                                <div className="row login_form_element mt-4">
                                    <a className="btn btn-success form-control login_register_btn "
                                       onClick={toLogin}>{t('TO_LOG_IN')}</a>
                                </div>
                            </form>

                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRegistration
