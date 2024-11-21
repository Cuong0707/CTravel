import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../style/Step3.scss'

function MyModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='text-center'>
                {/* <Button variant="primary w-75" onClick={handleShow}>
                    Chi Tiêt
                </Button> */}
                <button onClick={handleShow} className="btn btn-warning w-75">Chi Tiết</button>
            </div>
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi Tiết Phòng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row d-flex ms-2 me-2">
                        {/* <input className="col-5" type="text" name="name" placeholder="Họ Và Tên" onChange={onInputChanged} /> */}
                        {/* <input className="col-5 ms-2" type="text" name="name" placeholder="Họ Và Tên" onChange={onInputChanged} required/> */}
                        <div className="col-md-4 mb-3">
                            <label htmlFor="validationCustom01" className="form-label">Loại phòng</label>
                            <input type="text" className="form-control" name="name" id="validationCustom01" required disabled />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom02" className="form-label">Diện tích phòng</label>
                            <input type="text" className="form-control"
                                id="validationCustom02" required
                                name="name" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="validationCustom02" className="form-label">Số lượng phòng</label>
                            <input type="number" className="form-control"
                                id="validationCustom02" required
                                name="name" />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom02" className="form-label">Loại giường</label>
                            <input type="text" className="form-control"
                                id="validationCustom02" required
                                name="name" />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom05" className="form-label">Kích thước giường</label>
                            <input type="number" className="form-control"
                                id="validationCustom05" required
                                name="name" />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="validationCustom05" className="form-label">Giá phòng</label>
                            <input type="number" className="form-control"
                                id="validationCustom05" required
                                name="name" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="validationCustom05" className="form-label">Điểm nổi bật</label>
                            <input type="text" className="form-control"
                                id="validationCustom05" required
                                name="name" />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="formFile" className="form-label">Hình ảnh phòng</label>
                            <input className="form-control" type="file" id="formFile" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Huỷ
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MyModal;