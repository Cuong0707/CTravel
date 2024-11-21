import React, { useEffect } from "react";

import '../../style/Main/style.scss';

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from "react-router-dom";
import Aos from "aos";
import 'aos/dist/aos.css';
function Blogs() {
    useEffect(() => {
        Aos.init()
    }, [])
    return (
        <div className="container mt-5" data-aos="fade-up-right" data-aos-duration="1700">
            <h2 className="destination-title">Blogs</h2>
            <div className="destination-wrapper">
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    spaceBetween={40}
                    slidesPerView={5}
                    autoplay={{ delay: 2500 }}
                    navigation
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide>
                        <div className="card">
                            <img className="card-img-top" aria-hidden src="https://hellodulich.com/wp-content/uploads/2022/11/doi-cat-phuong-mai-quy-nhon-300x200.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h6 className="card-title">Đồi cát Phương Mai Quy Nhơn – “Tiểu sa mạc”</h6>
                                <p className="card-text">Chia sẽ</p>
                                <div className="destination-list-content-rating">
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-half-fill"></i>
                                </div>
                                <Link to="https://hellodulich.com/doi-cat-phuong-mai-quy-nhon/" className="btn btn-primary">Chi Tiết</Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="card">
                            <img className="card-img-top" aria-hidden src="https://hellodulich.com/wp-content/uploads/2021/09/bai-viet-hay-nhat-2.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h6 className="card-title">Kinh Nghiệm Đi Du Lịch Phú Quốc A-Z</h6>
                                <p className="card-text">Chia sẽ</p>
                                <div className="destination-list-content-rating">
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-half-fill"></i>
                                </div>
                                <Link to="https://hellodulich.com/kinh-nghiem-du-lich-phu-quoc-20/" className="btn btn-primary">Chi Tiết</Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="card" >
                            <img className="card-img-top" aria-hidden src="https://hellodulich.com/wp-content/uploads/2021/09/cong-vien-nuoc-hon-thom-phu-quoc-1.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h6 className="card-title">Review Công Viên Nước Hòn Thơm Phú Quốc</h6>
                                <p className="card-text">Chia sẽ</p>
                                <div className="destination-list-content-rating">
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-half-fill"></i>
                                </div>
                                <Link to="https://hellodulich.com/review-cong-vien-nuoc-hon-thom-phu-quoc-20/" className="btn btn-primary">Chi Tiết</Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="card" >
                            <img className="card-img-top" aria-hidden src="https://hellodulich.com/wp-content/uploads/2022/12/nen-an-gi-o-hue.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h6 className="card-title">Top 10 món ăn đậm xứ Kinh Thành</h6>
                                <p className="card-text">Ẩm Thực </p>
                                <div className="destination-list-content-rating">
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-half-fill"></i>
                                </div>
                                <Link to="https://hellodulich.com/nen-an-gi-o-hue/" className="btn btn-primary">Chi Tiết</Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="card" >
                            <img className="card-img-top" aria-hidden src="https://hellodulich.com/wp-content/uploads/2022/11/quan-hai-san-o-duong-dong-phu-quoc.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h6 className="card-title">Top 10 quán hải sản Phú Quốc nhất định phải thử</h6>
                                <p className="card-text">Ẩm Thực</p>
                                <div className="destination-list-content-rating">
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-half-fill"></i>
                                </div>
                                <Link to="#" className="btn btn-primary">Chi Tiết</Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="card" >
                            <img className="card-img-top" aria-hidden src="https://hellodulich.com/wp-content/uploads/2022/12/vuon-anh-sang-lumiere-da-lat.jpg" alt="Card image cap." />
                            <div className="card-body">
                                <h6 className="card-title">Vườn ánh sáng Lumiere nơi không gian “Hư Ảo”</h6>
                                <p className="card-text">Check-in</p>
                                <div className="destination-list-content-rating">
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-half-fill"></i>
                                </div>
                                <Link to="https://hellodulich.com/vuon-anh-sang-lumiere-da-lat/" className="btn btn-primary">Chi Tiết</Link>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div >
    )
}


export default Blogs;