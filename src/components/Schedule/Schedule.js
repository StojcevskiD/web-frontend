import './Schedule.css'
import {useRef, useState} from "react";
import * as htmlToImage from "html-to-image";

const Schedule = () => {


    const [selectedRows, setSelectedRows] = useState([])
    const subjectRef = useRef()
    const professorRef = useRef()
    const lecturesHallRef = useRef()
    const colorRef = useRef()
    const timePeriod = ['08:00-08:45', '09:00-09:45'
        , '10:00-10:45', '11:00-11:45', '12:00-12:45', '13:00-13:45',
        '14:00-14:45', '15:00-15:45', '16:00-16:45', '17:00-17:45', '18:00-18:45', '19:00-19:45', '20:00-20:45'
    ]

    const printRows = () => {
        const array = []
        timePeriod.map(r => {
            let number = r.substring(0, 2)
            array.push(<tr className="schedule_row">
                <td className="schedule_columns">{r}</td>
                <td id={"1_" + number} onClick={handleSelect} className="schedule_columns"/>
                <td id={"2_" + number} onClick={handleSelect} className="schedule_columns"/>
                <td id={"3_" + number} onClick={handleSelect} className="schedule_columns"/>
                <td id={"4_" + number} onClick={handleSelect} className="schedule_columns"/>
                <td id={"5_" + number} onClick={handleSelect} className="schedule_columns"/>
            </tr>)
        })
        return array
    }

    const checkIfNear = (id) => {
        let flag = true
        let toBreak = false
        selectedRows.map(row => {
            if (!toBreak) {
                let num1 = parseInt(row.substring(2, 4))
                let num2 = parseInt(id.substring(2, 4))
                const result = num1 - num2

                if (row.charAt(0) !== id.charAt(0) || result > 1 || result < -1) {
                    flag = false
                } else {
                    flag = true
                    toBreak = true
                }
            }
        })

        return flag
    }

    const createElement = (size, fontSize, padding, background, position, text) => {
        let div = document.createElement('div')
        div.style.position = 'absolute'
        div.style.background = background
        div.style.width = '234px'
        div.style.height = (size * 45 - 1) + 'px'
        div.innerText = text
        div.style.display = 'flex'
        div.style.alignItems = position
        div.style.justifyContent = position
        div.style.fontSize = fontSize + 'rem'
        div.style.padding = padding
        return div
    }

    const handleSelect = (e) => {
        let id = e.target.id
        if (id) {
            if (selectedRows.length === 0 || checkIfNear(id)) {
                if (document.getElementById(id).style.background === 'rgb(165, 203, 250)') {
                    document.getElementById(id).style.background = 'none'
                    setSelectedRows(selectedRows.filter(row => {
                        return row !== id
                    }))
                } else {
                    document.getElementById(id).style.background = "#a5cbfa"
                    setSelectedRows(prevState => [...prevState, id])
                }
            }
        }
    }

    const getRandomColor = () => {
        var letters = 'BCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }

    const handleSubmit = () => {
        if (selectedRows.length !== 0) {
            const id = selectedRows.sort()[0] //go zimam najgornoto selektirano pole
            const size = selectedRows.length
            let color = colorRef.current.value === '#000000' ? getRandomColor() : colorRef.current.value
            const div = createElement(size, 1.5, 0, color, 'center', subjectRef.current.value)
            const hall = createElement(size, 0.5, '3px', 'none', 'start', lecturesHallRef.current.value)
            const teachers = createElement(size, 0.5, '0 3px 0 0', 'none', 'end', professorRef.current.value)
            // let div = document.createElement('div')
            // div.style.position = 'absolute'
            // div.style.background = '#b9b9ff'
            // div.style.width = '234px'
            // div.style.height = (size * 45 - 1) + 'px'
            // div.innerText = 'Дискретни структури'
            // div.style.display = 'flex'
            // div.style.alignItems = 'center'
            // div.style.justifyContent = 'center'

            // let span1 = document.createElement('div')
            // span1.style.position = 'absolute'
            // span1.innerText = 'bbb'
            // span1.style.fontSize = '0.5rem'
            // span1.style.padding = '3px'
            //
            // let span2 = document.createElement('div')
            // span2.style.position = 'absolute'
            // span2.innerText = 'Михова д-р Марија'
            // span2.style.fontSize = '0.5rem'
            // span2.style.width = '234px'
            // span2.style.height = (size * 45 - 1) + 'px'
            // span2.style.paddingRight = '3px'
            // span2.style.display = 'flex'
            // span2.style.alignItems = 'end'
            // span2.style.justifyContent = 'end'

            let column = document.getElementById(id.toString())
            column.append(div)
            column.append(hall)
            column.append(teachers)
            setSelectedRows([])
        }
    }

    return (
        <div className="container">
            <div className="">
                <h1>Распоред на часови</h1>
                <input ref={subjectRef} className="schedule_inputs" placeholder="Име на предмет"/>
                <input ref={professorRef} className="schedule_inputs" placeholder="Професори"/>
                <input ref={lecturesHallRef} className="schedule_inputs" placeholder="Предавална"/>
                <label>Choose color (random if black):</label>
                <input ref={colorRef} className="schedule_inputs" type="color"/>
                <button onClick={handleSubmit} className="btn btn-sm btn-success schedule_submit">Submit</button>
                <div id='my-node'>
                    <table className="table table-bordered" id="schedule_table">
                        <thead>
                        <tr className="schedule_header col">
                            <th className="schedule_header_column_time"/>
                            <th className="schedule_header_columns">Понеделник</th>
                            <th scope="col-2" className="schedule_header_columns">Вторник</th>
                            <th scope="col-2" className="schedule_header_columns">Среда</th>
                            <th scope="col-2" className="schedule_header_columns">Четврток</th>
                            <th scope="col-2" className="schedule_header_columns">Петок</th>
                        </tr>
                        </thead>
                        <tbody>

                        {printRows()}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Schedule