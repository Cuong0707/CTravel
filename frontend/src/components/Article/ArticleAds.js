import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import 'aos/dist/aos.css';
function ArticleAds() {
    useEffect(() => {
        Aos.init()
    }, [])
    return (
        <article className="col-3 home-ads">
            <div className="card border-3 cardads ">
                <img src="http://cafefcdn.com/thumb_w/640/2017/2-1483951483654.jpg" className="card-img-top" alt="..." />
                <span className="badge bg-danger text-animation"> HOT</span>
                <div className="card-body row bg-light">
                    <h6 className="card-title text-uppercase col-12 fw-bold">Khách sạn Rex, TP HCM</h6>
                    <p className="card-text col-10 ">Top khách sạn cho giới thượng lưu</p>
                    <Link to="contact" className="btn fs-3 bg-primary text-white border rounded-circle col-2"><i className="bi bi-chevron-right"></i></Link>
                    <small className="card-text col-10 float-end">Ads</small>
                </div>
            </div>
            <div className="card border-3 cardads mt-2 mb-2">
                <img src="https://noithatkendesign.vn/storage/app/media/thiet-ke-nha-hang-mon-ngon-viet-nam-noi-giao-thoa-ban-sac/thiet-ke-nha-hang-mon-ngon-viet-nam-noi-giao-thoa-ban-sac-8.jpg" className="card-img-top" alt="..." />
                <span className="badge bg-danger text-animation"> HOT</span>
                <div className="card-body row bg-light">
                    <h6 className="card-title text-uppercase col-12 fw-bold">Viet Nga Restaurant Vung Tau</h6>
                    <p className="card-text col-10 ">Nụ hôn kiểu Pháp trên môi nàng Á Đông</p>
                    <Link to="contact" className="btn fs-3 bg-primary text-white border rounded-circle col-2"><i className="bi bi-chevron-right"></i></Link>
                    <small className="card-text col-10 text-muted">Ads</small>
                </div>
            </div>
        </article >
    )
}


export default ArticleAds;