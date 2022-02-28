import {Card, CardBody} from "reactstrap";
import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import SubjectService from "../../repository/SubjectRepository";
import {FadeLoader} from "react-spinners";
import YearService from "../../repository/YearRepository";
import Swal from "sweetalert2";

const EditSubject = () => {

    const id = parseInt(useParams().id)
    const [subjectForEdit, setSubjectForEdit] = React.useState()
    const [loading, setLoading] = React.useState(true)
    const [semesterTypeName, setSemesterTypeName] = React.useState(true)
    const [years, setYears] = React.useState([])
    const [yearName, setYearName] = React.useState(true)
    const [formData, setFormData] = React.useState()
    const [subjectName, setSubjectName] = React.useState()


    useEffect(() => {
        SubjectService.getSubjectById(id).then((s) => {
            setSubjectForEdit(s.data)
            setSemesterTypeName(s.data.semesterType.name)
            setYearName(s.data.year.name)
            setFormData(s.data)
            setSubjectName(s.data.name)
            fetchAllYears()
            console.log("jjj", s.data)
            console.log("yearname",s.data.year.name)
        }
    ).then(() => {
            setLoading(false)
        })},[])

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            editSubjectHandler()
        }
    }

    const editSubjectHandler = () => {
         if((formData.name !== subjectForEdit.name) || (formData.year.name!== subjectForEdit.year.name)
             || (formData.semesterType.name !== subjectForEdit.semesterType.name)){
             console.log("editdaa", formData)
             SubjectService.editSubject(formData).then(s => {
             console.log("promeneto", s)
                 Swal.fire(
                     'Успешно!',
                     'Предметот е успешно променет.',
                     'success'
                 ).then(() => {
                     window.location.href = "/subjects?page=1"
                 })
             } )
         }else{
             Swal.fire(
                 'Грешка!',
                 'Предметот нема промена.',
                 'error'
             )
         }
    }

    const updateSemesterType = (e) => {
        setFormData({
            ...formData,
            semesterType: e.target.options[e.target.selectedIndex].value
        })
        setSemesterTypeName(e.target.options[e.target.selectedIndex].value)
        console.log("rrr", e.target.options[e.target.selectedIndex].value)
        console.log("type",e.target.options[e.target.selectedIndex].id)
        console.log("formdata",formData)
    }

    const fetchAllYears = () => {
        YearService.getAllYears().then((year) => {
            setYears(year.data)
        } )
    }

    const updateYears = (y) => {
        setFormData({
            ...formData,
            [y.target.name]: y.target.value
        })
        setYearName(y.target.value)
        console.log("yearname",y.target.name,y.target.id,y.target)
        console.log("formdata",formData)
    }

    const updateName = (n) => {
        setFormData({
            ...formData,
            [n.target.name]: n.target.value
        })
        console.log("name",n.target.value)
        setSubjectName(n.target.value)
        console.log("name",n.target.name, n.target.value)
        console.log("formdata",formData)
    }


    return (
        <div onKeyPress={handleKeyPress}>
            {loading === true ?
                <div id="div_loader">
                    <FadeLoader speedMultiplier={2} color={"#2a439a"}/>
                    <div id="loading_mess">Loading...</div>
                </div>
                :
                <div className="container">
                    <div className="row ">
                        <div className="col add_sub_positions">
                            <Card id="login_card">
                                <div className="row">
                                    <h1 id="login_title">{subjectForEdit.name}</h1>
                                </div>
                                <CardBody>
                                    <form id="add_sub_form">
                                        <div className="row add_sub_element">
                                            <input name="name" type="text" value={subjectName} onChange={updateName}
                                                   className="form-control "/>

                                        </div>
                                        <div className="row add_sub_element">
                                            <select value={semesterTypeName} id="select" name="semesterType"
                                                    className="form-control form-select" onChange={updateSemesterType}>
                                                <option>Изберете го типот на семестарот</option>
                                                <option id="zima" value="зимски">зимски</option>
                                                <option id="leto" value="летен">летен</option>
                                            </select>
                                        </div>
                                        <div className="row add_sub_element">
                                            {console.log("sssss",subjectForEdit)}
                                            <h6>Одберете ја годината во која се предава предметот:</h6>
                                            {
                                                years.map((y) => {
                                                    return(
                                                        <label>
                                                            <input name="year" value={y.name} type="radio" checked={yearName === y.name}
                                                            onChange={updateYears}/> {y.name} година
                                                        </label>
                                                    )
                                                })
                                            }
                                        </div>
                                        {console.log("form2",subjectForEdit)}
                                        <button type="submit" className="rounded add_subject add_sub_element" onClick={editSubjectHandler}>Измени
                                        </button>
                                    </form>
                                </CardBody>
                            </Card>
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}

export default EditSubject
