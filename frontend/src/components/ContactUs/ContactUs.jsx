import React from 'react';
import '../../style/Contact.scss'; // Import the CSS file for styling
import { GeoAltFill, TelephoneFill, EnvelopeAtFill } from 'react-bootstrap-icons';

const ContactUs = () => {
    return (
        <div className="container-contact">
            <div className="content">
                <div className="left-side">
                    <div className="address details">
                        <GeoAltFill className='fs-1' />
                        <div className="topic">Địa Chỉ</div>
                        <div className="text-one">Công Viên Phần Mềm, Quận 12</div>
                        <div className="text-two">Thành Phố Hồ Chí Minh</div>
                    </div>
                    <div className="phone details">
                        <TelephoneFill className='fs-1' />
                        <div className="topic">Liên Hệ</div>
                        <div className="text-one">+0098 9893 5647</div>
                        <div className="text-two">+0096 3434 5678</div>
                    </div>
                    <div className="email details">
                        <EnvelopeAtFill className='fs-1' />
                        <div className="topic">Email</div>
                        <div className="text-one">hotro@saigontrip.vn</div>
                    </div>
                </div>
                <div className="right-side">
                    <div className="topic-text">Gửi tin nhắn cho chúng tôi</div>
                    <p>
                        Nếu bạn có bất kỳ công việc nào từ tôi hoặc bất kỳ loại truy vấn nào liên quan đến hướng dẫn của tôi, bạn có thể gửi tin nhắn cho tôi từ đây. Tôi rất hân hạnh được giúp đỡ bạn                    </p>
                    <form action="#">
                        <div className="input-box">
                            <input type="text" placeholder="Nhập Tên Bạn" />
                        </div>
                        <div className="input-box">
                            <input type="email" placeholder="Nhập Email" />
                        </div>
                        <div className="input-box">
                            <input type="number" placeholder="Nhập Số Điện Thoại" />
                        </div>
                        <div className="input-box">
                            <textarea type="text" placeholder="Câu Hỏi Của Bạn" alt='Nhập Câu Hỏi Của Bạn'/>
                        </div>
                        {/* <div className="input-box message-box"></div> */}
                        <div className="button d-flex justify-content-md-end">
                            <input type="button" value="Gửi Ngay" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
