import React from 'react'

const AsideHotel = () => {
    return (
        <aside className='col-3'>
            <div className='card border-1 mb-2'>
                <div className='card-body'>
                    <div className=''>
                        <h5 className='fw-bold'>Tiêu Chuẩn Đánh Giá</h5>
                        <select className='form-select form-select-sm mb-2' aria-label='Small select example'>
                            <option defaultValue>Vui Lòng Chọn</option>
                            <option value='1'>1 Sao</option>
                            <option value='2'>2 Sao</option>
                            <option value='3'>3 Sao</option>
                            <option value='4'>4 Sao</option>
                            <option value='5'>5 Sao</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='card border-1 mb-2'>
                <div className='card-body'>
                    <div className=''>
                        <h5 className='fw-bold'>Tỉnh</h5>
                        <select className='form-select form-select-sm mb-2' aria-label='Small select example'>
                            <option value='An Giang'>An Giang</option>
                            <option value='Bà Rịa - Vũng Tàu'>Bà Rịa - Vũng Tàu</option>
                            <option value='Bắc Giang'>Bắc Giang</option>
                            <option value='Bắc Kạn'>Bắc Kạn</option>
                            <option value='Bạc Liêu'>Bạc Liêu</option>
                            <option value='Bắc Ninh'>Bắc Ninh</option>
                            <option value='Bến Tre'>Bến Tre</option>
                            <option value='Bình Định'>Bình Định</option>
                            <option value='Bình Dương'>Bình Dương</option>
                            <option value='Bình Phước'>Bình Phước</option>
                            <option value='Bình Thuận'>Bình Thuận</option>
                            <option value='Bình Thuận'>Bình Thuận</option>
                            <option value='Cà Mau'>Cà Mau</option>
                            <option value='Cao Bằng'>Cao Bằng</option>
                            <option value='Đắk Lắk'>Đắk Lắk</option>
                            <option value='Đắk Nông'>Đắk Nông</option>
                            <option value='Điện Biên'>Điện Biên</option>
                            <option value='Đồng Nai'>Đồng Nai</option>
                            <option value='Đồng Tháp'>Đồng Tháp</option>
                            <option value='Đồng Tháp'>Đồng Tháp</option>
                            <option value='Gia Lai'>Gia Lai</option>
                            <option value='Hà Giang'>Hà Giang</option>
                            <option value='Hà Nam'>Hà Nam</option>
                            <option value='Hà Tĩnh'>Hà Tĩnh</option>
                            <option value='Hải Dương'>Hải Dương</option>
                            <option value='Hậu Giang'>Hậu Giang</option>
                            <option value='Hòa Bình'>Hòa Bình</option>
                            <option value='Hưng Yên'>Hưng Yên</option>
                            <option value='Khánh Hòa'>Khánh Hòa</option>
                            <option value='Kiên Giang'>Kiên Giang</option>
                            <option value='Kon Tum'>Kon Tum</option>
                            <option value='Lai Châu'>Lai Châu</option>
                            <option value='Lâm Đồng'>Lâm Đồng</option>
                            <option value='Lạng Sơn'>Lạng Sơn</option>
                            <option value='Lào Cai'>Lào Cai</option>
                            <option value='Long An'>Long An</option>
                            <option value='Nam Định'>Nam Định</option>
                            <option value='Nghệ An'>Nghệ An</option>
                            <option value='Ninh Bình'>Ninh Bình</option>
                            <option value='Ninh Thuận'>Ninh Thuận</option>
                            <option value='Phú Thọ'>Phú Thọ</option>
                            <option value='Quảng Bình'>Quảng Bình</option>
                            <option value='Quảng Bình'>Quảng Bình</option>
                            <option value='Quảng Ngãi'>Quảng Ngãi</option>
                            <option value='Quảng Ninh'>Quảng Ninh</option>
                            <option value='Quảng Trị'>Quảng Trị</option>
                            <option value='Sóc Trăng'>Sóc Trăng</option>
                            <option value='Sơn La'>Sơn La</option>
                            <option value='Tây Ninh'>Tây Ninh</option>
                            <option value='Thái Bình'>Thái Bình</option>
                            <option value='Thái Nguyên'>Thái Nguyên</option>
                            <option value='Thanh Hóa'>Thanh Hóa</option>
                            <option value='Thừa Thiên Huế'>Thừa Thiên Huế</option>
                            <option value='Tiền Giang'>Tiền Giang</option>
                            <option value='Trà Vinh'>Trà Vinh</option>
                            <option value='Tuyên Quang'>Tuyên Quang</option>
                            <option value='Vĩnh Long'>Vĩnh Long</option>
                            <option value='Vĩnh Phúc'>Vĩnh Phúc</option>
                            <option value='Yên Bái'>Yên Bái</option>
                            <option value='Phú Yên'>Phú Yên</option>
                            <option value='Tp.Cần Thơ'>Tp.Cần Thơ</option>
                            <option value='Tp.Đà Nẵng'>Tp.Đà Nẵng</option>
                            <option value='Tp.Hải Phòng'>Tp.Hải Phòng</option>
                            <option value='Tp.Hà Nội'>Tp.Hà Nội</option>
                            <option value='TP  HCM'>TP HCM</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='card border-1 mb-2'>
                <div className='card-body'>
                    <div className=''>
                        <h5 className='fw-bold'>Tiện Nghi</h5>
                        <div className='row'>
                            <div className='form-check h6 col-6'>
                                <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault' />
                                <label className='form-check-label' htmlFor='flexCheckDefault'>
                                    Hồ Bơi
                                </label>
                            </div>

                            <div className='form-check h6 col-6'>
                                <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault' />
                                <label className='form-check-label' htmlFor='flexCheckDefault'>
                                    Bữa Sáng
                                </label>
                            </div>

                            <div className='form-check h6 col-6'>
                                <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault' />
                                <label className='form-check-label' htmlFor='flexCheckDefault'>
                                    Wifi
                                </label>
                            </div>

                            <div className='form-check h6 col-6'>
                                <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault' />
                                <label className='form-check-label' htmlFor='flexCheckDefault'>
                                    Lễ Tân 24h
                                </label>
                            </div>

                            <div className='form-check h6 col-6'>
                                <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault' />
                                <label className='form-check-label' htmlFor='flexCheckDefault'>
                                    Phòng Gym
                                </label>
                            </div>

                            <div className='form-check h6 col-6'>
                                <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault' />
                                <label className='form-check-label' htmlFor='flexCheckDefault'>
                                    Xe Đưa Đón
                                </label>
                            </div>

                            <div className='form-check h6 col-6'>
                                <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault' />
                                <label className='form-check-label' htmlFor='flexCheckDefault'>
                                    Quầy Bar
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='card border-1 mb-2'>
                <div className='card-body'>
                    <div className=''>
                        <h5 className='fw-bold'>Phạm Vi Giá</h5>
                        <div className='form-group'>
                            <input
                                type='number'
                                className='form-control mb-1'
                                id='exampleFormControlInput1'
                                placeholder='Từ'
                            />
                            <input
                                type='number'
                                className='form-control'
                                id='exampleFormControlInput2'
                                placeholder='Đến'
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='card border-1 mb-2'>
                <div className='card-body'>
                    <div className=''>
                        <h5 className='fw-bold'>Thời Gian Nhận/Trả Phòng</h5>
                        <div className='form-group'>
                            <input
                                type='time'
                                className='form-control mb-1'
                                id='exampleFormControlInput1'
                                placeholder='Từ'
                            />
                            <input
                                type='time'
                                className='form-control'
                                id='exampleFormControlInput2'
                                placeholder='Đến'
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='text-end'>
                <button className='btn btn-secondary col-4'>Reset</button>
                <button className='btn btn-primary col-4 ms-2'>Xác Nhận</button>
            </div>
        </aside>
    )
}

export default AsideHotel
