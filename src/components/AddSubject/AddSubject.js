import {Card, CardBody} from "reactstrap";
import './AddSubject.css'
import React, {useEffect} from "react";
import YearService from "../../repository/YearRepository";
import SemesterTypeService from "../../repository/SemesterType";
import SubjectService from "../../repository/SubjectRepository";
import {FadeLoader} from "react-spinners";
import Swal from "sweetalert2";

const AddSubject = () => {

    const [formData, setFormData] = React.useState({
        name: "",
        semesterType: "",
        year: ""
    })
    const [allYears, setAllYears] = React.useState([])
    const [allTypes, setAllTypes] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        getAllYears()
        getAllSemesterTypes()
    }, [])

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            addSubjectHandler()
        }
    }

    const addSubjectHandler = () => {
        if (formData.name !== "" && formData.year !== "" && formData.semesterType !== "") {
            SubjectService.addSubject(formData).then(r => {
                Swal.fire(
                    'Успешно!',
                    'Предметот е успешно додаден.',
                    'success'
                ).then(() => {
                    window.location.href = "/subjects?page=1"
                })
            }).catch(r => {
                Swal.fire(
                    'Грешка!',
                    'Предметот веке постои во листата од предмети.',
                    'error'
                )
            })
        }
    }

    const getAllYears = () => {
        YearService.getAllYears().then(r => {
            setAllYears(r.data)
        })
    }

    const getAllSemesterTypes = () => {
        SemesterTypeService.getAllSemesterTypes().then(r => {
            setAllTypes(r.data)
            setLoading(false)
        })
    }


    const updateValueYear = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.id
        })
    }

    const updateValueType = (e) => {
        setFormData({
            ...formData,
            semesterType: e.target.options[e.target.selectedIndex].id
        })
    }

    const updateValueName = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value[0].toUpperCase() + e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div onKeyPress={handleKeyPress}>
            <div className="container">
                {loading === true ?
                    <div id="div_loader">
                        <FadeLoader speedMultiplier={2} color={"#2a439a"}/>
                        <div id="loading_mess">Loading...</div>
                    </div>
                    :
                    <div className="row ">
                        <div className="col add_sub_positions">
                            <Card id="login_card">
                                <div className="row">
                                    <h1 id="login_title">Додади предмет</h1>
                                </div>
                                <CardBody>
                                    <form id="add_sub_form" onSubmit={handleSubmit}>
                                        <div className="row add_sub_element">
                                            <input name="name" type="text" className="form-control"
                                                   onChange={updateValueName}
                                                   placeholder="Внеси име на предметот (кирилица)"
                                                   required/>
                                        </div>

                                        <div className="row add_sub_element">
                                            <h6>Одберете ја годината во која се предава предметот:</h6>
                                            {allYears.map((y) => {
                                                return (
                                                    <div onClick={updateValueYear} key={y.id}>
                                                        <input name="year" type="radio" id={y.id} required/>
                                                        <label htmlFor={y.id}>{y.name} година</label>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        <div className="row add_sub_element">
                                            <select name="semesterType" className="form-control form-select"
                                                    onChange={updateValueType} required>
                                                <option defaultValue="">Изберете го типот на семестарот</option>
                                                {allTypes.map(t => {
                                                    return (
                                                        <option name="semesterType" id={t.id}
                                                                key={t.id}>{t.name} семестар
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </div>

                                        <button type="submit" className="rounded add_subject add_sub_element"
                                                onClick={addSubjectHandler}>Додади
                                        </button>
                                    </form>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default AddSubject
