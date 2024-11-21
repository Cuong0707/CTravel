import React, { useState } from "react";

const ModalOrder = () => {

    //Chosse Avatar
    const [avatar, setAvatar] = useState(
        "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
    ); // Hình ảnh mặc định

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]; // Lấy file hình ảnh đầu tiên từ sự kiện onChange
        const reader = new FileReader(); // Tạo một đối tượng FileReader để đọc file

        reader.onload = () => {
            // Khi file đã được đọc xong, cập nhật state avatar với đường dẫn hình ảnh mới
            setAvatar(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file); // Đọc file dưới dạng URL Data
        }
    };
    return (
        <div className="modal" id="myModal">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header mt-5">
                        <h4 className="modal-title mt-5">Chi Tiết Đơn Hàng</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card border border-0">
                                        <div className="card-body">
                                            <table className="table table-hover table-bordered">
                                                <thead>
                                                    <tr className="table-info fw-bold text-center">
                                                        <th scope="col">#</th>
                                                        <th scope="col">Loại Phòng</th>
                                                        <th scope="col">Số Lượng Phòng</th>
                                                        <th scope="col">Số Người</th>
                                                        <th scope="col">Số Trẻ Em</th>
                                                        <th scope="col">Check In</th>
                                                        <th scope="col">Tổng Số Ngày Ở</th>
                                                        <th scope="col">Giá Nguyên Bản</th>
                                                        <th scope="col">Giá Khi Giảm</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Suite King</td>
                                                        <td>2</td>
                                                        <td>4</td>
                                                        <td>0</td>
                                                        <td>14-10-2023</td>
                                                        <td>5</td>
                                                        <td>2000000</td>
                                                        <td>1820000</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Deluxe</td>
                                                        <td>2</td>
                                                        <td>0</td>
                                                        <td>2</td>
                                                        <td>04-01-2023</td>
                                                        <td>3</td>
                                                        <td>100000</td>
                                                        <td>91000</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                        >
                            Đóng
                        </button>
                        <button
                            className="btn btn-primary float-end"
                            type="submit"
                        >
                            Hoàn Thành
                        </button>
                    </div>
                </div>
            </div>
        </div>)
}
export default ModalOrder;