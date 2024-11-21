import React from "react";
import '../../style/Main/style.scss';

const Aside = () => {
    return (
        <aside className="col-3">
            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <h5 className="card-title"><u className="fs-4 ms-5">BỘ LỌC TIỆN ÍCH</u></h5>
                    <label htmlFor="Location">Miền<span className="text-danger">*</span></label>
                    <select id="Location" name="Location" className="form-control mt-2">
                        <option defaultValue disabled>Chọn</option>
                        <option value="bac">Miền Bắc</option>
                        <option value="trung">Miền Trung</option>
                        <option value="nam">Miền Nam</option>
                    </select>
                    <label className="mt-2" htmlFor="Location">Tỉnh<span className="text-danger">*</span></label>
                    <select id="Location" name="Location" className="form-control mt-2">
                        <option value="TP HCM">Hồ Chí Minh</option>
                        <option value="Tp.Cần Thơ">Cần Thơ</option>
                        <option value="Tp.Đà Nẵng">Đà Nẵng</option>
                        <option value="Tp.Hải Phòng">Hải Phòng</option>
                        <option value="Tp.Hà Nội">Hà Nội</option>
                        <option value="An Giang">An Giang</option>
                        <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                        <option value="Bắc Giang">Bắc Giang</option>
                        <option value="Bắc Kạn">Bắc Kạn</option>
                        <option value="Bạc Liêu">Bạc Liêu</option>
                        <option value="Bắc Ninh">Bắc Ninh</option>
                        <option value="Bến Tre">Bến Tre</option>
                        <option value="Bình Định">Bình Định</option>
                        <option value="Bình Dương">Bình Dương</option>
                        <option value="Bình Phước">Bình Phước</option>
                        <option value="Bình Thuận">Bình Thuận</option>
                        <option value="Bình Thuận">Bình Thuận</option>
                        <option value="Cà Mau">Cà Mau</option>
                        <option value="Cao Bằng">Cao Bằng</option>
                        <option value="Đắk Lắk">Đắk Lắk</option>
                        <option value="Đắk Nông">Đắk Nông</option>
                        <option value="Điện Biên">Điện Biên</option>
                        <option value="Đồng Nai">Đồng Nai</option>
                        <option value="Đồng Tháp">Đồng Tháp</option>
                        <option value="Đồng Tháp">Đồng Tháp</option>
                        <option value="Gia Lai">Gia Lai</option>
                        <option value="Hà Giang">Hà Giang</option>
                        <option value="Hà Nam">Hà Nam</option>
                        <option value="Hà Tĩnh">Hà Tĩnh</option>
                        <option value="Hải Dương">Hải Dương</option>
                        <option value="Hậu Giang">Hậu Giang</option>
                        <option value="Hòa Bình">Hòa Bình</option>
                        <option value="Hưng Yên">Hưng Yên</option>
                        <option value="Khánh Hòa">Khánh Hòa</option>
                        <option value="Kiên Giang">Kiên Giang</option>
                        <option value="Kon Tum">Kon Tum</option>
                        <option value="Lai Châu">Lai Châu</option>
                        <option value="Lâm Đồng">Lâm Đồng</option>
                        <option value="Lạng Sơn">Lạng Sơn</option>
                        <option value="Lào Cai">Lào Cai</option>
                        <option value="Long An">Long An</option>
                        <option value="Nam Định">Nam Định</option>
                        <option value="Nghệ An">Nghệ An</option>
                        <option value="Ninh Bình">Ninh Bình</option>
                        <option value="Ninh Thuận">Ninh Thuận</option>
                        <option value="Phú Thọ">Phú Thọ</option>
                        <option value="Quảng Bình">Quảng Bình</option>
                        <option value="Quảng Bình">Quảng Bình</option>
                        <option value="Quảng Ngãi">Quảng Ngãi</option>
                        <option value="Quảng Ninh">Quảng Ninh</option>
                        <option value="Quảng Trị">Quảng Trị</option>
                        <option value="Sóc Trăng">Sóc Trăng</option>
                        <option value="Sơn La">Sơn La</option>
                        <option value="Tây Ninh">Tây Ninh</option>
                        <option value="Thái Bình">Thái Bình</option>
                        <option value="Thái Nguyên">Thái Nguyên</option>
                        <option value="Thanh Hóa">Thanh Hóa</option>
                        <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                        <option value="Tiền Giang">Tiền Giang</option>
                        <option value="Trà Vinh">Trà Vinh</option>
                        <option value="Tuyên Quang">Tuyên Quang</option>
                        <option value="Vĩnh Long">Vĩnh Long</option>
                        <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                        <option value="Yên Bái">Yên Bái</option>
                        <option value="Phú Yên">Phú Yên</option>
                    </select>
                    <label className="mt-2" htmlFor="Location">Các Địa Điểm Nổi Bật<span className="text-danger">*</span></label>
                    <select id="Location" name="Location" className="form-control mt-2">
                        <option defaultValue disabled>Chọn</option>
                        <option value="Tp.Hà Nội">Hà Nội</option>
                        <option value="TP HCM">Hồ Chí Minh</option>
                        <option value="Tp.Cần Thơ">Cần Thơ</option>
                        <option value="Tp.Đà Nẵng">Đà Nẵng</option>
                        <option value="Tp.Hải Phòng">Hải Phòng</option>
                    </select>
                    <div className="mt-2 row">
                        <label htmlFor="Location">Các Dịch Vụ<span className="text-danger">*</span></label>
                        <div className="form-check col-6 mt-2">
                            <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Khách Sạn
                            </label>
                        </div>
                        <div className="form-check col-6 mt-2">
                            <input className="form-check-input" type="checkbox" id="defaultCheck2" />
                            <label className="form-check-label" htmlFor="defaultCheck2">
                                Nhà Hàng
                            </label>
                        </div>
                        <div className="form-check col-6">
                            <input className="form-check-input" type="checkbox" id="defaultCheck3" />
                            <label className="form-check-label" htmlFor="defaultCheck3">
                                Địa Điểm Tham Quan
                            </label>
                        </div>
                        <div className="form-check col-6">
                            <input className="form-check-input" type="checkbox" id="defaultCheck4" />
                            <label className="form-check-label" htmlFor="defaultCheck4">
                                Phương Tiện Di Chuyển
                            </label>
                        </div>
                    </div>
                    <div className="mt-3 text-end">
                        <button className="btn btn-secondary">Tạo Lại</button>
                        <button className="btn btn-primary ms-2">Xác Nhận</button>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Aside;