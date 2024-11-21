import React, { useRef, useEffect } from 'react'
import '../../style/Hotel/MainHotel.scss'
import '../../style/Main/style.scss'
import { GeoAltFill } from 'react-bootstrap-icons'
import NavHotel from './HotelNav'
import HotelCarousel from './HotelImg'
import HotelDescription from './HotelDescription'
import HotelRoom from './HotelRoom'
import Aos from 'aos'
import { useParams } from 'react-router-dom'
import 'aos/dist/aos.css'
import { useQuery } from 'react-query'
import hotelApi from '../../api/hotel.api'
import { useState } from 'react'
import { formatCurrency, generateImageFromFileName } from '../../utils/utils'
import { max, min } from 'lodash'

const HotelDetail = () => {
    const { id } = useParams()
    const [hotel, setHotel] = useState(null)
    useEffect(() => {
        Aos.init()
    }, [])

    const scrollRef = useRef(null)

    const handleButtonClick = () => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    const { data, isLoading } = useQuery({
        queryKey: ['fetchHotel'],
        queryFn: () => {
            if (id) {
                return hotelApi.getHotelById(id)
            } else {
                return Promise.resolve(null)
            }
        },
        onSuccess: (data) => {
            setHotel(data.data)
        }
    })

    const getHotelPrice = () => {
        if (!hotel) {
            return { min: 0, max: 0 }
        }
        const lsPrices = hotel.hotelDetails.map((detail) => {
            return parseFloat(detail.priceOfRoom)
        })
        const maxPrice = formatCurrency(max(lsPrices), 'VNĐ') || 0
        const minPrice = formatCurrency(min(lsPrices), 'VNĐ') || 0
        return { min: minPrice, max: maxPrice }
    }
    console.log(hotel)
    return (
        <div className='container-hotel'>
            <NavHotel />
            {isLoading && <div>...Loading Hotel Detail</div>}
            {!isLoading && hotel && (
                <div className='container mt-3'>
                    <div className='row'>
                        <div className='col-7'>
                            <h3 className='card-title fw-bold'>{hotel.nameOfHotel}</h3>
                            <h5 className='card-title small mt-2'>{hotel.nameOfHotel}</h5>
                            <p className='card-text fw-bold mt-2'>
                                <GeoAltFill /> {hotel?.address}
                            </p>
                        </div>
                        <div className='col-5'>
                            <p className='card-text fw-bold h6 text-end'>Giá phòng mỗi đêm từ</p>
                            <p className='card-text fw-bold text-danger h4 text-end'>{getHotelPrice().min}</p>
                            <div className='text-end'>
                                <button className='btn btn-danger fw-bold col-5' onClick={handleButtonClick}>
                                    Chọn Phòng
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='img-HotelDetail mt-3'>
                        <HotelCarousel
                            images={hotel?.photosOfHotels?.map((photo) => {
                                return generateImageFromFileName(photo.image)
                            })}
                        />
                    </div>
                    <div
                        className='description mt-3'
                        ref={scrollRef}
                        data-aos='fade-up'
                        data-aos-anchor-placement='center-bottom'
                    >
                        <HotelDescription hotel={hotel} />
                    </div>
                    <div className='HotelRoom mt-1' data-aos='fade-right' data-aos-duration='3000'>
                        {hotel?.hotelDetails && <HotelRoom hotel={hotel} />}
                    </div>
                </div>
            )}
        </div>
    )
}

export default HotelDetail
