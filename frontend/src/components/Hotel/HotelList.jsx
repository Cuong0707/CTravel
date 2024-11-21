import React from 'react'
import '../../style/Hotel/HotelList.scss'
import NavHotel from './HotelNav'
import AsideHotel from './AsideHotel'
import MainHotel from './HotelMain'

const HotelList = () => {
    return (
        <div className='container-hotel'>
            <div className='container'>
                <div className='row mt-5'>
                    <AsideHotel />
                    <MainHotel />
                </div>
            </div>
        </div>
    )
}

export default HotelList
