import React from 'react'
import '../../style/Hotel/HotelRoom.scss'
import { People } from 'react-bootstrap-icons'
import { InboxFill } from 'react-bootstrap-icons'
import { PatchQuestionFill } from 'react-bootstrap-icons'
import { Tooltip } from 'react-bootstrap'
import { OverlayTrigger } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatCurrency, generateImageFromFileName, getHotelDetailStandard } from '../../utils/utils'

const HotelRoom = ({ hotel = {} }) => {
    const tooltip = (
        <Tooltip id='tooltip'>
            <strong>Không </strong> hủy phòng được đâu bồ ơi.
        </Tooltip>
    )
    const { hotelDetails } = hotel
    return (
        <div className='Card-HotelRoom'>
            <div className='fw-bold ms-3 h4 title-room'>Những phòng có tại khách sạn</div>
            {hotelDetails.map((hotelDetail) => {
                const { hotelDetailId, typeOfRoom, photosOfRoom, sizeOfBed, typeOfBed, priceOfRoom } = hotelDetail
                return (
                    <div key={hotelDetailId} className='card border border-0 mt-3'>
                        <h4 className='fw-bold ms-3 mt-2'>{getHotelDetailStandard(typeOfRoom)}</h4>
                        <div className='row'>
                            <div className='col-4 ms-3'>
                                <img src={generateImageFromFileName(photosOfRoom)} alt='' />
                                <hr style={{ width: '300px' }} />
                                <div className='mt-2'>
                                    <span className='badge rounded-pill bg-success'>
                                        Check-in: 14:00 - Check-out: 12:00
                                    </span>
                                </div>
                                <div className='mt-2'>
                                    <span className='badge rounded-pill bg-success'>Giường: {sizeOfBed}</span>
                                </div>
                                <div className='mt-2'>
                                    <OverlayTrigger placement='top' overlay={tooltip}>
                                        <button className='btn btn-light text-primary btn-sm'>
                                            <PatchQuestionFill /> Chính sách hủy phòng
                                        </button>
                                    </OverlayTrigger>
                                </div>
                            </div>
                            <div className='col-7'>
                                <div className='h6 fw-bold'>{getHotelDetailStandard(typeOfRoom)}</div>
                                <div className='row'>
                                    {/* <div className='col-3 fw-bold'>
                                        <People /> 2 Khách
                                    </div> */}
                                    <div className='col-3 fw-bold'>
                                        <InboxFill /> Giường: {typeOfBed}
                                    </div>
                                </div>
                                <hr />
                                <div className='row'>
                                    <div className='col-6 text-secondary fw-bold'>
                                        <p>Không Bao Gồm Ăn Sáng</p>
                                        <p>Không Hoàn Tiền</p>
                                        <p>Không Đổi Lịch</p>
                                        <p>Không Hút Thuốc</p>
                                    </div>
                                    <div className='col-6 text-success fw-bold'>
                                        <p>Lễ tân 24h</p>
                                        <p>Dịch vụ giặt ủi</p>
                                        <p>Máy ATM/Ngân hàng</p>
                                        <p>Nhà hàng</p>
                                    </div>
                                </div>
                                <div className=''>
                                    <p className='card-text fw-bold text-danger h5 text-end'>
                                        {formatCurrency(parseFloat(priceOfRoom))}
                                    </p>
                                    <div className='text-end'>
                                        <Link to='/order' state={{ hotel: hotel, hotelDetail: hotelDetail }}>
                                            <button className='btn btn-danger fw-bold col-2 blink-button'>
                                                Đặt Phòng
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default HotelRoom
