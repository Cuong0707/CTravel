import React from "react";

import '../../style/Main/style.scss'


class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="container-fluid">
                    <div id="carouselExampleControls" className="carousel slide col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" data-bs-ride="carousel">
                        <div className="carousel-inner" style={{ height: "580px" }}>
                            <div className="carousel-item active">
                                <img src="images/banner1.png" className="d-block w-100" alt="..." style={{ height: "550px" }} />
                                {/* <video autoPlay controls className="d-block bg-success" height={550} >
                                    <source src="images/video-banner.mp4" type="video/mp4"></source>
                                </video> */}
                            </div>
                            <div className="carousel-item">
                                <img src="images/hero-bg-1.webp" className="d-block w-100" alt="..." style={{ height: "550px" }} />
                            </div>
                            <div className="carousel-item">
                                <img src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg" className="d-block w-100" alt="..." style={{ height: "550px" }} />
                            </div>
                            <div className="carousel-item">
                                <img src="https://hinhanhonline.com/Images/Album/DulichVietNam/vinh-ha-long-01.jpg" className="d-block w-100" alt="..." style={{ height: "550px" }} />
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </header>
        )
    }
}
export default Header;