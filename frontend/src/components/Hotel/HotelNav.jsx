import React, { useState } from "react";
import '../../style/Hotel/NavHotel.scss'
import { Search } from 'react-bootstrap-icons';


const NavHotel = () => {
    const [inputValue, setInputValue] = useState("");
    const [selectedOption2, setSelectedOption2] = useState("");
    const [selectedOption3, setSelectedOption3] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleSelectChange2 = (event) => {
        setSelectedOption2(event.target.value);
    }

    const handleSelectChange3 = (event) => {
        setSelectedOption3(event.target.value);
    }

    return (
        <nav className="navbar-top navbar navbar-expand-lg bg-primary">
            <div className="select-container">
                <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Thành Phố" />

                <select className="form-control" value={selectedOption2} onChange={handleSelectChange2}>
                    <option defaultValue>Loại Phòng</option>
                    <option value="suite-king">Suite King</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="vip">VIP</option>
                    <option value="superior">Superior</option>
                    <option value="standard">Standard</option>
                    <option value="extra-bed">Extra Bed</option>
                    <option value="phu-thu-an-sang">Phụ Thu Ăn Sáng</option>
                    <option value="bungalow-view">Bungalow view</option>
                    <option value="gia-dinh">Gia Đình</option>
                </select>

                <select className="form-control" value={selectedOption3} onChange={handleSelectChange3}>
                    <option defaultValue>Số Giường</option>
                    <option value="option1">1</option>
                    <option value="option2">2</option>
                    <option value="option3">3</option>
                    <option value="option3">4</option>
                </select>
                <button className="btn btn-light text-primary fw-bold"><Search /> Tìm</button>
            </div>
        </nav>
    )
}

export default NavHotel;