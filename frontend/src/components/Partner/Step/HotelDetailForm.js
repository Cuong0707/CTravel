import { useState } from 'react'

function HotelDetailForm({ hotel, onChange = () => {}, index }) {
    const [hotelDetails, setHotelDetails] = useState(hotel)
    const handleChange = (key) => {
        return (e) => {
            setHotelDetails((prev) => {
                return { ...prev, [key]: e.target.value }
            })
            onChange(index, key, e.target.value)
        }
    }
    const handleChangePhoto = (event) => {
        setHotelDetails((prev) => {
            return { ...prev, photosOfRoom: event.target.files[0] }
        })
        onChange(index, 'photosOfRoom', event.target.files[0])
    }
    return (
        <div className='row d-flex border border-primary b-1 rounded-1 my-2 mb-4 py-2 px-2'>
            <div className='col-md-4 mb-3'>
                <label htmlFor='validationCustom01' className='form-label'>
                    Loại phòng
                </label>
                <select
                    value={hotelDetails?.typeOfRoom}
                    onChange={handleChange('typeOfRoom')}
                    className='form-select'
                    name='roomType'
                >
                    <option defaultValue disabled>
                        Chọn loại phòng
                    </option>
                    <option value='phongDon'>Phòng đơn</option>
                    <option value='phongDoi'>Phòng đôi</option>
                    <option value='phongGiaDinh'>Phòng gia đình</option>
                    <option value='suiteKing'>Suite king</option>
                    <option value='deluxe'>Deluxe</option>
                    <option value='phongTieuChuan'>Phòng Tiêu Chuẩn</option>
                    <option value='phongCaoCap'>Phòng Cao Cấp</option>
                    <option value='phongHangSang'>Phòng Hạng Sang</option>
                </select>
            </div>
            <div className='col-md-4'>
                <label htmlFor='validationCustom02' className='form-label'>
                    Diện tích phòng
                </label>
                <input
                    value={hotelDetails?.areaOfRoom}
                    onChange={handleChange('areaOfRoom')}
                    type='text'
                    className='form-control'
                    id='validationCustom02'
                    required
                    name='name'
                />
            </div>
            <div className='col-md-4 mb-3'>
                <label htmlFor='validationCustom02' className='form-label'>
                    Số lượng phòng
                </label>
                <input
                    value={hotelDetails?.amountOfRoom}
                    onChange={handleChange('amountOfRoom')}
                    type='number'
                    className='form-control'
                    id='validationCustom02'
                    required
                    name='name'
                />
            </div>
            <div className='col-md-4'>
                <label htmlFor='validationCustom02' className='form-label'>
                    Loại giường
                </label>
                <input
                    value={hotelDetails?.typeOfBed}
                    onChange={handleChange('typeOfBed')}
                    type='text'
                    className='form-control'
                    id='validationCustom02'
                    required
                    name='name'
                />
            </div>
            <div className='col-md-4'>
                <label htmlFor='validationCustom05' className='form-label'>
                    Kích thước giường
                </label>
                <input
                    value={hotelDetails?.sizeOfBed}
                    onChange={handleChange('sizeOfBed')}
                    type='number'
                    className='form-control'
                    id='validationCustom05'
                    required
                    name='name'
                />
            </div>

            <div className='col-md-4 mb-3'>
                <label htmlFor='validationCustom05' className='form-label'>
                    Giá phòng
                </label>
                <input
                    value={hotelDetails?.priceOfRoom}
                    onChange={handleChange('priceOfRoom')}
                    type='number'
                    className='form-control'
                    id='validationCustom05'
                    required
                    name='name'
                />
            </div>
            <div className='col-md-6'>
                <label htmlFor='validationCustom05' className='form-label'>
                    Điểm nổi bật
                </label>
                <input
                    value={hotelDetails?.highlights}
                    onChange={handleChange('highlights')}
                    type='text'
                    className='form-control'
                    id='validationCustom05'
                    required
                    name='name'
                />
            </div>
            <div className='mb-3 col-md-6'>
                <label htmlFor='formFile' className='form-label'>
                    Hình ảnh phòng
                </label>
                <input onChange={handleChangePhoto} className='form-control' type='file' id='formFile' />
                {hotelDetails?.photosOfRoom && <p>Selected File: {hotelDetails?.photosOfRoom?.name}</p>}
            </div>
        </div>
    )
}

export default HotelDetailForm
