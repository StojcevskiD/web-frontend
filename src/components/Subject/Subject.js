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
    const [files1, setFiles1] = React.useState()
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

    const addMaterials = () => {
        const formData = new FormData()
        formData.append('files', files1)
        // const files = files1

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
                    alert("file uploaded")
                })

                // Swal.fire(
                //     'Успешно!',
                //     'Фајловите беа успешно прикачени.',
                //     'success'
                // )
            }
        }).catch(() => {
            Swal.fire(
                'Грешка!',
                'Обидете се повторно.',
                'error'
            )
        })
    }

    const deleteMaterials = (e) => {

    }

    const fileChange = (e) => {
        const id = e.target.id
        const fil = e.target.files

        if (id === "first_input") {
            setFiles1(fil)
            if (fil.length === 0) {
                setInputButtonDisable1(true)
            } else {
                setInputButtonDisable1(false)
            }
        } else if (id === "second_input") {
            setFiles2(fil)
            if (fil.length === 0) {
                setInputButtonDisable2(true)
            } else {
                setInputButtonDisable2(false)
            }
        } else if (id === "third_input") {
            setFiles3(fil)
            if (fil.length === 0) {
                setInputButtonDisable3(true)
            } else {
                setInputButtonDisable3(false)
            }
        }
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
                                <Form.Control type="file" onChange={fileChange} id="first_input"/>
                            </Form.Group>
                            <button className="btn btn-outline-primary" onClick={addMaterials}
                                    disabled={inputButtonDisable1}>Додади
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
                                    disabled={inputButtonDisable2}>Додади
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
                                    disabled={inputButtonDisable3}>Додади
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