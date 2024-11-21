import { useState } from 'react'
import ActionButtons from '../ActionButtons'
import HotelDetailForm from './HotelDetailForm'

const ServiceStep = ({ handleChange = () => {} }) => {
    const [hotelDetails, setHotelDetails] = useState([
        {
            typeOfRoom: '',
            areaOfRoom: '',
            amountOfRoom: '',
            typeOfBed: '',
            sizeOfBed: '',
            highlights: '',
            priceOfRoom: '',
            photosOfRoom: ''
        }
    ])

    const handleChangeHotelDetail = (index, key, value) => {
        setHotelDetails((prev) => {
            prev[index][key] = value
            return prev
        })
    }

    const validateForm = () => {
        return true
    }

    const handleNextStep = () => {
        if (validateForm()) {
            handleChange('service', hotelDetails, 3)
        }
    }

    const handleAddField = () => {
        setHotelDetails((prev) => {
            return [
                ...prev,
                {
                    typeOfRoom: '',
                    areaOfRoom: '',
                    amountOfRoom: '',
                    typeOfBed: '',
                    sizeOfBed: '',
                    highlights: '',
                    priceOfRoom: '',
                    photosOfRoom: ''
                }
            ]
        })
    }

    return (
        <div className='px-5'>
            {hotelDetails.map((hotel, index) => {
                return (
                    <HotelDetailForm
                        key={index}
                        hotelDetails={hotel}
                        index={index}
                        onChange={handleChangeHotelDetail}
                    />
                )
            })}
            <button
                className='px-5 btn-them btn btn-primary mb-2 d-flex justify-content-center'
                onClick={handleAddField}
            >
                <span className='me-2'>+</span> <span>Thêm</span>
            </button>
            <div className='d-flex justify-content-end mb-2 mt-3'>
                <ActionButtons onClick={handleNextStep} />
            </div>
        </div>
    )
}

export default ServiceStep
