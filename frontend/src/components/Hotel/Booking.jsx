import React, { useState, useEffect, useMemo } from 'react'

import '../../style/Hotel/Booking.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ScrollToTop from '../../Services/ScrollToTop'
import useAppContext from '../../hook/useAppContext'
import {
    formatCurrency,
    formatDate,
    generateImageFromFileName,
    showErrorMessage,
    showSuccessMessage
} from '../../utils/utils'
import { Fragment } from 'react'
import { useMutation } from 'react-query'
import orderApi from '../../api/order.api'
const Booking = () => {
    const { profile } = useAppContext()
    const { hotel, hotelDetail } = useLocation().state
    const navigate = useNavigate()
    const lsImages = useMemo(() => {
        return hotel?.photosOfHotels?.map((item) => {
            return generateImageFromFileName(item.image)
        })
    }, [hotel])

    const [formState, setFormState] = useState({
        numberOfPeople: 1,
        numberOfChildren: 1,
        amountOfRoom: 1,
        lengthOfStay: 1,
        paymentMethod: 'visa',
        checkInDate: new Date()
    })

    const handleInputChange = (key) => {
        return (e) => {
            setFormState((prev) => {
                return { ...prev, [key]: e.target.value }
            })
        }
    }

    const validate = () => {
        return true
    }

    const getFormData = () => {
        const formData = {
            partnerId: hotel.partner.partnerId,
            paymentMethod: formState.paymentMethod,
            ordersOfHotels: [
                {
                    amountOfRoom: formState.amountOfRoom,
                    numberOfChildren: formState.numberOfChildren,
                    numberOfPeople: formState.numberOfPeople,
                    hotelDetailId: hotelDetail.hotelDetailId,
                    originalPrice: parseFloat(hotelDetail?.priceOfRoom),
                    promotionPrice: parseFloat(hotelDetail?.priceOfRoom) * formState.amountOfRoom,
                    checkInDate: formatDate(formState.checkInDate) + ' 00:00:00',
                    lengthOfStay: formState.lengthOfStay
                }
            ]
        }
        return formData
    }
    const { mutate, isLoading } = useMutation({
        mutationFn: () => {
            return orderApi.checkOut(getFormData())
        },
        onSuccess: (res) => {
            navigate('/pay/' + res.data.orderID)
            showSuccessMessage('Đặt phòng thành công')
        },
        onError: (error) => {
            console.log(error)
            showErrorMessage('Some thing went wrong')
        }
    })

    const handleSubmit = () => {
        if (validate()) {
            mutate()
        }
    }

    if (!hotel) {
        return <div>Booking empty</div>
    }

    return (
        <div className='container-booking'>
            <div className='container mt-5 bp_pricedetails_holder bp_pricedetails_legibility'>
                <div className=''>
                    <div className='bp_sidebar_content_block bp_sidebar_content_block--bookingdetails_summary'>
                        <div className='bp_sidebar_content_block__header'>
                            <div className='bp_sidebar_content_block__header_title'>Thông Tin Của Bạn</div>
                        </div>
                        <div className='bp_sidebar_content_block__section'>
                            <ul className='bp_sidebar_content_block__ul'>
                                <li className='bp_sidebar_content_block__li'>
                                    <div className='bp_sidebar_content_block__li_title'>
                                        Họ Tên: <span className='text-danger'>{profile?.fullname}</span>
                                    </div>
                                </li>
                                <li className='bp_sidebar_content_block__li'>
                                    <div className='bp_sidebar_content_block__li_title'>
                                        Số Điện Thoại: <span className='text-danger'>{profile?.phone_number}</span>
                                    </div>
                                </li>
                                <li className='bp_sidebar_content_block__li bp_sidebar_content_block__li--last'>
                                    <div className='bp_sidebar_content_block__li_title '>
                                        Địa Chỉ Email: <span className='text-danger'>{profile?.email}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='bp_pricedetails_box'>
                        <div className='bp_sidebar_content_block__header bp_sidebar_content_block__header--price_details '>
                            <div className='bp_sidebar_content_block__header_title'>Tóm tắt giá của bạn</div>
                        </div>
                        <div className='bp_pricedetails_fauxtable'>
                            <ul className='bp_pricedetails_breakdown'>
                                <li className='bp_pricedetails_room'>
                                    <span className='bp_pricedetails_room_name'>{hotel?.nameOfHotel}</span>
                                </li>
                            </ul>
                        </div>
                        <div className='bp_pricedetails_total'>
                            <div className='tpi_bp_total_price_block bui-u-clearfix'>
                                <span className='bp_pricedetails_total_name'>Giá Gốc</span>
                                <span className='jq-tooltip bp_pricedetails_total_value'>
                                    {formatCurrency(parseFloat(hotelDetail?.priceOfRoom))}
                                </span>
                            </div>
                        </div>
                        <div className='bp_pricedetails_fauxtable'>
                            Giá Ưu Đãi
                            <span className='jq-tooltip bp_pricedetails_total_value text-success fw-bold'>
                                {formatCurrency(parseFloat(hotelDetail?.priceOfRoom))}
                            </span>
                        </div>
                        <div className='bp_pricedetails_fauxtable fw-bold text-uppercase'>
                            Tổng Tiền
                            <span className='jq-tooltip bp_pricedetails_total_value text-success fw-bold'>
                                {formatCurrency(parseFloat(hotelDetail?.priceOfRoom) * formState.amountOfRoom)}
                            </span>
                        </div>
                    </div>
                    <div className=''>
                        <div>
                            <div className='da48633ced b1a676be74'>
                                <div className='e64dc2a754'>
                                    <div className='bb3ab2d4b6'>Xem lại điều kiện đặt phòng của bạn</div>
                                </div>
                                <div className='bd6ed0d925'>
                                    <div className='bdcd217dc6'>Ưu đãi dành cho đối tác</div>
                                    <ul className='e0c5089316'>
                                        <li>
                                            Bạn sẽ không thể thay đổi thông tin cá nhân hoặc thông tin đặt chỗ sau khi
                                            việc đặt chỗ của bạn hoàn tất
                                        </li>
                                        <li>Hóa đơn sẽ do công ty đối tác của chúng tôi phát hành</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-12 '>
                <div className=' bp_hotel_details_holder clearfix '>
                    <div className='bp_hotel_photo  mt-5'>
                        <div className='bp_small_gallery bp_unselectable bp_hotel_gallery'>
                            <img
                                className='bp_small_gallery_main_img jq_tooltip'
                                src={lsImages?.at(0)}
                                tabIndex='0'
                                id='b_tt_holder_1'
                                aria-describedby='materialized_tooltip_9v6y0'
                                alt=''
                            />
                        </div>
                        <div className='bp_hotel_photo_previews_holder'>
                            {lsImages
                                ?.filter((_, index) => {
                                    return index > 0
                                })
                                .map((img) => {
                                    return (
                                        <Fragment key={img}>
                                            <img
                                                className='bp_hotel_photo_preview jq_tooltip'
                                                tabIndex='0'
                                                data-title="<img src='https://cf.bstatic.com/xdata/images/hotel/max400/409837721.webp?k=208005ce365c8eda09f1c7eb5b0efcfa09a18d74ef31c7e82f1d8d1ebf348bd5&amp;o='>"
                                                alt=''
                                                src={img}
                                            />
                                            <div className='bp_hotel_photo_preview_delimiter'></div>
                                        </Fragment>
                                    )
                                })}
                        </div>
                    </div>
                    <div className='bp_hotel_details'>
                        <div className='bp_hotel_name bp_hotel_name_pref bp_hotel_name_even_bigger  mt-5'>
                            <div className='bp_hotel_name_title'>{hotel.nameOfHotel}</div>
                            <span className='nowrap'>
                                <i className='bk-icon-wrapper bk-icon-stars star_track' title='5-star hotel'>
                                    <svg
                                        aria-hidden='true'
                                        className='bk-icon -sprite-ratings_stars_5'
                                        focusable='false'
                                        height='10'
                                        width='54'
                                        viewBox='0 0 65 12'
                                        role='presentation'
                                    >
                                        <path
                                            d='m13 4.6c0-.1-.1-.2-.2-.2l-4.5-.3-1.5-4c-.1-.1-.5-.1-.5 0l-1.5 4-4.6.3c-.1 0-.2.1-.2.2s0 .2.1.3l3.5 2.5-1.2 4.3c0 .1 0 .2.1.3h.3l3.7-2.6 3.7 2.6h.3c.1-.1.1-.2.1-.3l-1.2-4.4 3.5-2.5c.1 0 .1-.1.1-.2zm13 0c0-.1-.1-.2-.2-.2l-4.5-.3-1.5-4c-.1-.2-.4-.2-.5 0l-1.5 4-4.5.3c-.1 0-.2.1-.2.2s0 .2.1.3l3.5 2.5-1.2 4.3c0 .1 0 .2.1.3s.2.1.3 0l3.7-2.6 3.7 2.6h.3c.1-.1.1-.2.1-.3l-1.2-4.3 3.5-2.5zm13 0c0-.1-.1-.2-.2-.2l-4.5-.3-1.5-4c-.1-.2-.4-.2-.5 0l-1.5 4-4.5.3c-.1 0-.2.1-.2.2s0 .2.1.3l3.5 2.5-1.2 4.3c0 .1 0 .2.1.3s.2.1.3 0l3.7-2.6 3.7 2.6h.3c.1-.1.1-.2.1-.3l-1.2-4.3 3.5-2.5zm13 0c0-.1-.1-.2-.2-.2l-4.5-.3-1.5-4c-.1-.2-.4-.2-.5 0l-1.5 4-4.5.3c-.1 0-.2.1-.2.2s0 .2.1.3l3.5 2.5-1.2 4.3c0 .1 0 .2.1.3s.2.1.3 0l3.7-2.6 3.7 2.6h.3c.1-.1.1-.2.1-.3l-1.2-4.3 3.5-2.5zm13 0c0-.1-.1-.2-.2-.2l-4.5-.3-1.5-4c-.1-.2-.4-.2-.5 0l-1.5 4-4.5.3c-.1 0-.2.1-.2.2s0 .2.1.3l3.5 2.5-1.2 4.3c0 .1 0 .2.1.3s.2.1.3 0l3.7-2.6 3.7 2.6h.3c.1-.1.1-.2.1-.3l-1.2-4.3 3.5-2.5z'
                                            fill='#feba02'
                                        ></path>
                                    </svg>
                                    <span className='invisible_spoken'>5-star hotel</span>
                                </i>
                                <svg
                                    aria-hidden='true'
                                    className='bk-icon -iconset-thumbs_up_square'
                                    fill='#FEBB02'
                                    height='20'
                                    rel='300'
                                    width='20'
                                    viewBox='0 0 128 128'
                                    role='presentation'
                                    focusable='false'
                                >
                                    <path d='M112 8H16a8 8 0 0 0-8 8v96a8 8 0 0 0 8 8h96a8 8 0 0 0 8-8V16a8 8 0 0 0-8-8zM48 96H24V58h24zm56-25a8.7 8.7 0 0 1-2 6 8.9 8.9 0 0 1 1 4 6.9 6.9 0 0 1-5 7c-.5 4-4.8 8-9 8H56V58l10.3-23.3a5.4 5.4 0 0 1 10.1 2.7 10.3 10.3 0 0 1-.6 2.7L72 52h23c4.5 0 9 3.5 9 8a9.2 9.2 0 0 1-2 5.3 7.5 7.5 0 0 1 2 5.7z'></path>
                                </svg>
                            </span>
                        </div>
                        <div className='hotel-address'>
                            <div className='hotel-address-text'>
                                <i className='hotel-address-map-icon'></i>
                                <span className='hotel-address-text-wrap'>
                                    <span className='hotel-address-text-address'>{hotel.address}</span>
                                </span>
                            </div>
                        </div>
                        <div className='bp_hotel_great_location'>{hotel.description}</div>
                    </div>
                    <div className='content bp_legacy_form_box__content mt-4'>
                        <div className='required_fields_description'>
                            Sắp xong! Chỉ cần điền <b className='text-danger'>*</b> thông tin bắt buộc
                        </div>
                        <div className='bp-personal-details-form'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label htmlFor='cntRoom' className='tpi-form__label'>
                                        <span>Số Lượng Phòng</span>
                                        <abbr className='mandatory-asterisk' title='Required'>
                                            *
                                        </abbr>
                                    </label>
                                    <div className='tpi-form__field-validation-container'>
                                        <input
                                            value={formState.amountOfRoom}
                                            onChange={handleInputChange('amountOfRoom')}
                                            min={1}
                                            type='number'
                                            id='cntRoom'
                                            className='form-control mb-2'
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <label htmlFor='NumberChildren' className='tpi-form__label'>
                                        <span className='tpi-form__label-text'>Số Lượng Trẻ Em</span>
                                        <abbr className='mandatory-asterisk' title='Required'>
                                            *
                                        </abbr>
                                    </label>
                                    <div className='tpi-form__field-validation-container'>
                                        <input
                                            min={1}
                                            value={formState.numberOfChildren}
                                            onChange={handleInputChange('numberOfChildren')}
                                            type='number'
                                            id='NumberChildren'
                                            className='form-control mb-2'
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <label htmlFor='NumberPeople' className='tpi-form__label'>
                                        <span className='tpi-form__label-text'>Số Lượng Người Lớn</span>
                                        <abbr className='mandatory-asterisk' title='Required'>
                                            *
                                        </abbr>
                                    </label>
                                    <div className='tpi-form__field-validation-container'>
                                        <input
                                            min={1}
                                            value={formState.numberOfPeople}
                                            onChange={handleInputChange('numberOfPeople')}
                                            type='number'
                                            id='NumberPeople'
                                            className='form-control mb-2'
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <label htmlFor='lengthOfStay' className='tpi-form__label'>
                                        <span className='tpi-form__label-text'>Số ngày dự tính</span>
                                        <abbr className='mandatory-asterisk' title='Required'>
                                            *
                                        </abbr>
                                    </label>
                                    <div className='tpi-form__field-validation-container'>
                                        <input
                                            min={1}
                                            value={formState.lengthOfStay}
                                            onChange={handleInputChange('lengthOfStay')}
                                            type='number'
                                            id='lengthOfStay'
                                            className='form-control mb-2'
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <label htmlFor='paymentMethod' className='tpi-form__label'>
                                        <span className='tpi-form__label-text'>Phương thức thanh toán</span>
                                        <abbr className='mandatory-asterisk' title='Required'>
                                            *
                                        </abbr>
                                    </label>
                                    <div className='tpi-form__field-validation-container'>
                                        <select
                                            value={formState.paymentMethod}
                                            onChange={handleInputChange('paymentMethod')}
                                            id='paymentMethod'
                                            className='form-select '
                                            aria-label='Default select example'
                                        >
                                            <option value='visa'>Visa</option>
                                            <option value='mastercard'>Master Card</option>
                                            <option value='later'>Later</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <label htmlFor='lengthOfStay' className='tpi-form__label'>
                                        <span className='tpi-form__label-text'>Ngày check</span>
                                        <abbr className='mandatory-asterisk' title='Required'>
                                            *
                                        </abbr>
                                    </label>
                                    <div className='tpi-form__field-validation-container'>
                                        <input
                                            value={formState.checkInDate}
                                            onChange={handleInputChange('checkInDate')}
                                            min={new Date()}
                                            type='date'
                                            id='lengthOfStay'
                                            className='form-control mb-2'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ScrollToTop>
                            <button
                                onClick={handleSubmit}
                                className='submit_holder_button mt-3'
                                type='submit'
                                name='book'
                            >
                                {isLoading ? '...Loading' : 'Tiến Hành Thanh Toán'}
                            </button>
                        </ScrollToTop>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Booking
