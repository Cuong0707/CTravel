import React, { useEffect } from 'react'
import '../../style/Hotel/MainHotel.scss'
import { GeoAltFill } from 'react-bootstrap-icons'
import { EyeFill } from 'react-bootstrap-icons'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import useQueryConfig from '../../hook/useQueryConfig'
import { useQuery } from 'react-query'
import hotelApi from '../../api/hotel.api'
import useHttpErrorHandler from '../../hook/useHttpErrorHandler'
import { formatCurrency, generateImageFromFileName } from '../../utils/utils'
import { max, min } from 'lodash'
import { Pagination } from '@mui/material'

const MainHotel = () => {
    const queryConfig = useQueryConfig()
    const { handleError } = useHttpErrorHandler()
    const navigate = useNavigate()

    const { data, isLoading } = useQuery({
        queryKey: ['filterHotel', queryConfig],
        queryFn: () => {
            return hotelApi.filterHotel(queryConfig)
        },
        onSuccess: (res) => {
            console.log(res)
        },
        onError: (error) => {
            const errorRes = handleError(error)
        }
    })

    return (
        <main className='col-9'>
            {data?.data?.content?.map((hotel) => {
                const { hotelId, hotelDetails, nameOfHotel, view, address, breakfast, typeOfHotel, standard } = hotel
                const lsPrices = hotelDetails.map((detail) => {
                    return parseFloat(detail.priceOfRoom)
                })
                const maxPrice = formatCurrency(max(lsPrices), 'VNĐ')
                const minPrice = formatCurrency(min(lsPrices), 'VNĐ')
                return (
                    <div key={hotelId} className='card-MainHotel'>
                        <div className='card mb-3 border-0'>
                            <div className='row g-0'>
                                <div className='col-md-3 img-MainHotel'>
                                    <img
                                        src={generateImageFromFileName(hotelDetails.at(0)?.photosOfRoom || '')}
                                        className='img-fluid rounded-start'
                                        alt='...'
                                    />
                                </div>
                                <div className='col-md-9'>
                                    <div className='card-body row'>
                                        <h5 className='card-title fw-bold col-10'>{nameOfHotel}</h5>
                                        <p className='card-text col-2 text-info text-end fw-bold'>
                                            <EyeFill /> {view}
                                        </p>
                                        <p className='card-text fw-bold'>
                                            <GeoAltFill /> {address}
                                        </p>
                                        <p className='card-text'>
                                            <span className='badge bg-warning text-dark text-secondary'>
                                                {breakfast}
                                            </span>
                                            <span className='badge bg-warning text-dark text-secondary ms-2'>
                                                {typeOfHotel}
                                            </span>
                                            <span className='badge bg-warning text-dark text-secondary ms-2'>
                                                {standard}
                                            </span>
                                        </p>
                                        <p className='card-text fw-bold text-danger h4 text-end'>
                                            {minPrice} - {maxPrice}
                                        </p>
                                        <div className='text-end'>
                                            <Link to={`/HotelList/${hotelId}`}>
                                                <button className='btn btn-danger fw-bold col-2 blink-button'>
                                                    Chi Tiết
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <Pagination
                onChange={(_, page) => {
                    navigate({
                        pathname: '/HotelList',
                        search: createSearchParams({ ...queryConfig, pageNumber: page.toString() }).toString()
                    })
                }}
                count={data?.data?.totalPages || 1}
                color='primary'
            />
        </main>
    )
}

export default MainHotel
