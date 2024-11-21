import React, { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';

function Member() {
    useEffect(() => {
        Aos.init()
    }, [])
    return (

        <div className="container" data-aos="fade-right" data-aos-duration="3000">
            <h3 className="section-title">Đội Ngũ Chính Của Chúng Tôi</h3>
            <div className="testimonial-wrapper">
                <div className="testimonial-list">
                    <div>
                        <img src="images/user-Hieu.jpg" className="testimonial-user-image" alt="" />
                        <p className="testimonial-content">"Cảm ơn bạn đến với SaiGonTrip! Chúng tôi cung cấp thông tin và hỗ trợ cho những người yêu du lịch. Tại đây, bạn có thể tìm hiểu về
                            các điểm đến du lịch, lựa chọn khách sạn và hoạt động thú vị. Hy vọng trang web sẽ giúp bạn
                            có những trải nghiệm tuyệt vời!”</p>
                        <div className="testimonial-user-name">Nguyễn Trọng Hiếu</div>
                        <div className="testimonial-user-job">Dev</div>
                    </div>
                    <div>
                        <img src="images/user-Cuong.jpg" className="testimonial-user-image" alt="" />
                        <p className="testimonial-content">"Chào mừng bạn đến với trang web du lịch! Chúng tôi là nguồn thông tin đáng tin cậy và đa dạng cho những người
                            đam mê du lịch. Tại đây, bạn có thể khám phá những điểm đến hấp dẫn, những khách sạn tuyệt vời. Chúng tôi sẽ giúp bạn có những trải nghiệm du lịch
                            thuận lợi!”</p>
                        <div className="testimonial-user-name">Huỳnh Nhật Cường</div>
                        <div className="testimonial-user-job">Dev</div>
                    </div>
                    <div>
                        <img src="images/user-Kiet.jpg" className="testimonial-user-image" alt="" />
                        <p className="testimonial-content">"SaiGonTrip, bạn có thể khám phá các điểm đến hấp dẫn, tìm hiểu về văn hóa độc đáo,
                            lựa chọn địa điểm khách sạn và món ăn. Chúng tôi sẵn sàng giúp bạn có một chuyến du lịch đáng nhớ.
                            Cùng chúng tôi khám phá những điều mới về những địa điểm du lịch ở đất nước hình chữ S!.”</p>
                        <div className="testimonial-user-name">Võ Tuấn Kiệt</div>
                        <div className="testimonial-user-job">Dev</div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Member;