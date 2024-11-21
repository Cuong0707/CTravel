import React from 'react'
import { GeoAltFill } from 'react-bootstrap-icons'

const HotelDescription = ({ hotel }) => {
    const { description, address } = hotel
    return (
        <div className='row'>
            <div className='card border-0 mb-2 col-4'>
                <div className='card-body'>
                    <h5 className='fw-bold'>Giới Thiệu Cơ Sở</h5>
                    <p>{description}</p>
                </div>
            </div>

            <div className='card border-0 mb-2 col-4'>
                <div className='card-body row'>
                    <h5 className='fw-bold'>Các Tiện Ích</h5>
                    <div className=' col-6'>
                        <p>Bàn làm việc</p>
                        <p>Điều hòa</p>
                        <p>Phòng tắm vòi sen</p>
                        <p>TV</p>
                    </div>
                    <div className='col-6'>
                        <p>Lễ tân 24h</p>
                        <p>Dịch vụ giặt ủi</p>
                        <p>Máy ATM/Ngân hàng</p>
                        <p>Nhà hàng</p>
                    </div>
                </div>
            </div>

            <div className='card border-0 mb-2 col-4'>
                <div className='card-body'>
                    <h5 className='fw-bold'>Địa Chỉ</h5>
                    <p className='card-text fw-bold mt-2'>
                        <GeoAltFill /> {address}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HotelDescription
