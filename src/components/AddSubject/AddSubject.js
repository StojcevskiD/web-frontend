import {Card, CardBody} from "reactstrap";
import './AddSubject.css'
import React from "react";

const AddSubject = () => {

    const [formData, setFormData] = React.useState({
        name: "",
        semesterType: "",
        year: ""
    })
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            addSubjectHandler()
        }
    }

    const addSubjectHandler = () => {

    }

    const updateValue = (e) => {
        console.log("e", e.target)
    }

    return (
        <div onKeyPress={handleKeyPress}>
            <div className="container">
                <div className="row ">
                    <div className="col add_sub_positions">
                        <Card id="login_card">
                            <div className="row">
                                <h1 id="login_title">Додади предмет</h1>
                            </div>
                            <CardBody>
                                <form id="add_sub_form">
                                    <div className="row add_sub_element">
                                        <input name="name" type="text" className="form-control "
                                               placeholder="Внеси име на предметот"/>
                                    </div>
                                    <div className="row add_sub_element">
                                        <select name="semesterType" className="form-control form-select"
                                                onSelect={updateValue}>
                                            <option selected>Изберете го типот на семестарот</option>
                                            <option value="зимски">зимски</option>
                                            <option value="летен">летен</option>
                                        </select>
                                    </div>
                                    <div className="row add_sub_element">
                                        <h6>Одберете ја годината во која се предава предметот:</h6>
                                        <span>
                                        <input name="year" value="Прва година" type="radio"/>
                                            <label>Прва година</label></span>
                                        <span>
                                        <input name="year" value="Втора година" type="radio"/>
                                            <label>Втора година</label></span>
                                        <span>
                                        <input name="year" value="Трета година" type="radio"/>
                                            <label>Трета година</label></span>
                                        <span>
                                        <input name="year" value="Четврта година" type="radio"/>
                                            <label>Четврта година</label></span>
                                    </div>

                                    <button type="submit" className="rounded add_subject add_sub_element"
                                            onClick={addSubjectHandler}>Додади
                                    </button>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSubject
