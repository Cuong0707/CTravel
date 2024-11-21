import React from "react";
import { Link } from "react-router-dom";

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="container">
                    <div className="footer-top">
                        <Link to="#" className="footer-logo"><img src="images/tour-logo.png" alt="" /></Link>
                        <div className="footer-social">
                            <Link to="#"><i className="ri-facebook-fill"></i></Link>
                            <Link to="#"><i className="ri-instagram-fill"></i></Link>
                            <Link to="#"><i className="ri-twitter-fill"></i></Link>
                            <Link to="#"><i className="ri-linkedin-fill"></i></Link>
                        </div>
                    </div>
                    <div className="footer-links row mt-4">
                        <div className="col-5">
                            <b style={{ fontSize: "20px" }}>Công ty cổ phần du lịch Việt Nam SaiGonTrip</b>
                            <p className="mt-2">Tổng đài chăm sóc: 1900 2083</p>
                            <p>Email: hotro@saigontrip.vn</p>
                            <p>Văn phòng chính: Cong vien phan mem Quang Trung</p>
                            <div className="mb-3 row">
                                <label className="form-label">Đăng ký nhận thông báo mới nhất từ chúng tôi:</label>
                                <form className="d-flex">
                                    <input className="form-control me-2 col-ms-12" type="Email" placeholder="Email" aria-label="Email" style={{ width: "280px" }} />
                                    <button className="btn btn-success" type="submit">Gửi</button>
                                </form>
                            </div>
                            <div>
                                <Link to=""><img src="../images/logo-bocongthuong.png" style={{ height: "50px" }} alt=""></img></Link>
                                <Link to=""><img src="../images/logo-dkbocongthuong.png" style={{ height: "40px", marginLeft: "20px" }} alt=""></img></Link>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="footer-links-title">Chính sách & Quy định</div>
                            <ul className="footer-links-list">
                                <li><Link to="#">Điều khoản & điều kiện</Link></li>
                                <li><Link to="#">Quy định thanh toán</Link></li>
                                <li><Link to="#">Quy chế hoạt động</Link></li>
                                <li><Link to="#">Chương trình khách hàng thân thiết</Link></li>
                                <li><Link to="#">Chương trình đánh giá trải nghiệm khách sạn</Link></li>
                            </ul>
                        </div>
                        <div className="col-2">
                            <div className="footer-links-title">Khách hàng và đối tác</div>
                            <ul className="footer-links-list">
                                <li><Link to="#">Dịch Vụ</Link></li>
                                <li><Link to="#">Liên Hệ</Link></li>
                                <li><Link to="#">Chi Tiết Dịch Vụ</Link></li>
                                <li><Link to="#">Đăng Nhập</Link></li>
                                <li><Link to="#">Tuyển Dụng</Link></li>
                            </ul>
                        </div>
                        <div className="col-2">
                            <div className="footer-links-title">Khác</div>
                            <ul className="footer-links-list">
                                <li><Link to="#">SaiGonTrip Blog</Link></li>
                                <li><Link to="#">Địa Điểm Nổi Tiếng</Link></li>
                                <li><Link to="#">Xu Hướng</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom text-center row">
                        <p>SaiGonTrip là thành viên của FPT Services - Một trong những tập đoàn đứng đầu Đông Nam Á về du lịch trực tuyến và các dịch vụ liên quan</p>
                        <div className="footer-line-img">
                            <img src="../images/logo-fpt.png" className="col-4 " style={{ height: "100px", width: "100px" }} alt=""></img>
                            <img src="../images/logo-footer1.png" className="col-4 " style={{ height: "100px", width: "100px" }} alt=""></img>
                            <img src="../images/logo-footer2.png" className="col-4 " style={{ height: "120px", width: "120px" }} alt=""></img>
                            <img src="../images/logo-footer3.png" className="col-4" style={{ height: "100px", width: "100px" }} alt=""></img>
                        </div>
                        <p>CÔNG TY CỔ PHẦN DU LỊCH SaiGonTrip - Đăng ký kinh doanh số 113 - do Sở Kế hoạch và Đầu tư thành phố Hồ Chí Minh cấp lần đầu ngày 29 tháng 11 năm 2023</p>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;