import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import './Subject.css'
import SubjectService from "../../repository/SubjectRepository";
import Form from 'react-bootstrap/Form'
import Swal from 'sweetalert2'
import {BsTrash} from "react-icons/bs";
import FileService from "../../repository/FileRepository";


const Subject = () => {

    const id = parseInt(useParams().id)

    const [subject, setSubject] = React.useState()
    const [files1, setFiles1] = React.useState([])
    const [files2, setFiles2] = React.useState([])
    const [files3, setFiles3] = React.useState([])
    const [inputButtonDisable1, setInputButtonDisable1] = React.useState(true)
    const [inputButtonDisable2, setInputButtonDisable2] = React.useState(true)
    const [inputButtonDisable3, setInputButtonDisable3] = React.useState(true)


    useEffect(() => {
        SubjectService.getSubjectById(id).then((s) => {
            setSubject(s.data)
            // console.log("sub", s.data)
        })

    }, [id])

    const toFormData = (f) => {
        let formData = new FormData()
        for (let i = 0; i < f.length; i++) {
            formData.append("files", f[i])
        }

        Swal.fire({
            title: 'Дали сте сигурни?',
            text: "Дали сте сигурни дека сакате да ги прикачите фајловите? Оваа акција е неповратна!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Потврди',
            cancelButtonText: 'Откажи'
        }).then((result) => {
            if (result.isConfirmed) {
                FileService.uploadFile(id, formData).then((result) => {
                    Swal.fire(
                        'Успешно!',
                        'Фајловите беа успешно прикачени.',
                        'success'
                    )
                }).catch(() => {
                    Swal.fire(
                        'Грешка!',
                        'Големината на фајлот е преголема! Обидете се повторно.',
                        'error'
                    )
                })
            }
        })
    }

    const addMaterials = (e) => {
        const buttonId = e.target.id
        if (buttonId === "subject_button1") {
            toFormData(files1)
        } else if (buttonId === "subject_button2") {
            toFormData(files2)
        } else {
            toFormData(files3)
        }
    }

    const deleteMaterials = (e) => {

    }

    const fileChange = (e) => {
        const id = e.target.id
        const fil = e.target.files
        let arr = []
        for (let i = 0; i < fil.length; i++) {
            arr.push(fil[i])
        }
        if (id === "first_input") {
            if (fil.length === 0) {
                setFiles1(fil)
                setInputButtonDisable1(true)
            } else {
                setFiles1(arr)
                setInputButtonDisable1(false)
            }
        } else if (id === "second_input") {
            if (fil.length === 0) {
                setFiles2(fil)
                setInputButtonDisable2(true)
            } else {
                setFiles2(arr)
                setInputButtonDisable2(false)
            }
        } else if (id === "third_input") {
            if (fil.length === 0) {
                setFiles3(fil)
                setInputButtonDisable3(true)
            } else {
                setFiles3(arr)
                setInputButtonDisable3(false)
            }
        }
        console.log("aar", arr)
    }

    const showForm = (e) => {
        if (e.target.id === "first_button") {
            if (document.getElementById("first_form_div").style.display === "none") {
                document.getElementById("first_form_div").style.display = "block"
            } else {
                document.getElementById("first_form_div").style.display = "none"
            }
        } else if (e.target.id === "second_button") {
            if (document.getElementById("second_form_div").style.display === "none") {
                document.getElementById("second_form_div").style.display = "block"
            } else {
                document.getElementById("second_form_div").style.display = "none"
            }
        } else {
            if (document.getElementById("third_form_div").style.display === "none") {
                document.getElementById("third_form_div").style.display = "block"
            } else {
                document.getElementById("third_form_div").style.display = "none"
            }
        }
    }

    return (
        <div className="container">
            {subject !== undefined ?
                <div className="row">
                    <h1 id="subject_title">{subject.name}</h1>
                    <div className="col-12 col-md-4 subject_sub_title_border_right">
                        <h3 className="subject_sub_title">Прв колоквиум</h3>
                        <div>
                            <button className="btn btn-outline-primary subject_add_button" id="first_button"
                                    onClick={showForm}>Додади материјали
                            </button>
                        </div>
                        <div id="first_form_div" style={{display: "none"}}>
                            <Form.Group className="mb-3 subject_form_group">
                                <Form.Label><h5>-Додади материјали</h5></Form.Label>
                                <Form.Control type="file" multiple onChange={fileChange} id="first_input"/>
                            </Form.Group>
                            <button className="btn btn-outline-primary" onClick={addMaterials}
                                    disabled={inputButtonDisable1} id="subject_button1">Додади
                            </button>
                        </div>

                        <h5 className="subject_empty_text">Моментално нема материјали за овој дел</h5>
                        {/*<BsTrash className="subject_delete_icon" onClick={deleteMaterials}/>*/}
                    </div>

                    <div className="col-12 col-md-4 subject_sub_title_border_left subject_sub_title_border_right">
                        <h3 className="subject_sub_title">Втор колоквиум</h3>
                        <div>
                            <button className="btn btn-outline-primary subject_add_button" id="second_button"
                                    onClick={showForm}>Додади материјали
                            </button>
                        </div>
                        <div id="second_form_div" style={{display: "none"}}>
                            <Form.Group className="mb-3 subject_form_group">
                                <Form.Label><h5>-Додади материјали</h5></Form.Label>
                                <Form.Control type="file" multiple onChange={fileChange} id="second_input"/>
                            </Form.Group>
                            <button className="btn btn-outline-primary" onClick={addMaterials}
                                    disabled={inputButtonDisable2} id="subject_button2">Додади
                            </button>
                        </div>

                        <h5 className="subject_empty_text">Моментално нема материјали за овој дел</h5>

                    </div>

                    <div className="col-12 col-md-4 subject_sub_title_border_left">
                        <h3 className="subject_sub_title">Испит</h3>
                        <div>
                            <button className="btn btn-outline-primary subject_add_button" id="third_button"
                                    onClick={showForm}>Додади материјали
                            </button>
                        </div>
                        <div id="third_form_div" style={{display: "none"}}>
                            <Form.Group className="mb-3 subject_form_group">
                                <Form.Label><h5>-Додади материјали</h5></Form.Label>
                                <Form.Control type="file" multiple onChange={fileChange} id="third_input"/>
                            </Form.Group>
                            <button className="btn btn-outline-primary" onClick={addMaterials}
                                    disabled={inputButtonDisable3} id="subject_button3">Додади
                            </button>
                        </div>

                        <h5 className="subject_empty_text">Моментално нема материјали за овој дел</h5>

                    </div>
                </div>
                :
                <div/>
            }
        </div>
    )
}

export default Subject