import React from 'react';
import ReactDOM from 'react-dom';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '43%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default function ModalRoomManager() {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <button className='btn btn-success' onClick={openModal}><MapsHomeWorkIcon /></button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h3 ref={(_subtitle) => (subtitle = _subtitle)}>Room manager</h3>
                {/* <button onClick={closeModal}>close</button> */}
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="ms-5">
                                <input type="file" accept="image/*" onChange={""}
                                    style={{ display: "none" }} id="fileInput" />
                                <label htmlFor="fileInput">
                                    <img src={""} className="rounded-circle"
                                        style={{ width: "200px", cursor: "pointer", }}
                                        alt="Avatar"
                                        title="Click to choose file"
                                    />
                                </label>
                            </div>
                            <button className="btn btn-primary btn-sm float-end">Save</button>
                        </div>
                        <div className="col-md-9">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={""} className="row">
                                        <div className='col-md-4 mb-3'>
                                            <label htmlFor='validationCustom01' className='form-label'>
                                                Loại phòng
                                            </label>
                                            <select
                                                className='form-select'
                                                name='roomType'
                                            >
                                                <option value='' defaultValue disabled>
                                                    Chọn loại phòng
                                                </option>
                                                <option value='phongDon'>Phòng đơn</option>
                                                <option value='phongDoi'>Phòng đôi</option>
                                                <option value='phongGiaDinh'>Phòng gia đình</option>
                                                <option value='suiteKing'>Suite king</option>
                                                <option value='deluxe'>Deluxe</option>
                                                <option value='phongTieuChuan'>Phòng Tiêu Chuẩn</option>
                                                <option value='phongCaoCap'>Phòng Cao Cấp</option>
                                                <option value='phongHangSang'>Phòng Hạng Sang</option>
                                            </select>
                                        </div>
                                        <div className='col-md-4'>
                                            <label htmlFor='validationCustom02' className='form-label'>
                                                Diện tích phòng
                                            </label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                id='validationCustom02'
                                                required
                                                name='name'
                                            />
                                        </div>
                                        <div className='col-md-4 mb-3'>
                                            <label htmlFor='validationCustom02' className='form-label'>
                                                Số lượng phòng
                                            </label>
                                            <input
                                                type='number'
                                                className='form-control'
                                                id='validationCustom02'
                                                required
                                                name='name'
                                            />
                                        </div>
                                        <div className='col-md-4'>
                                            <label htmlFor='validationCustom02' className='form-label'>
                                                Loại giường
                                            </label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                id='validationCustom02'
                                                required
                                                name='name'
                                            />
                                        </div>
                                        <div className='col-md-4'>
                                            <label htmlFor='validationCustom05' className='form-label'>
                                                Kích thước giường
                                            </label>
                                            <input
                                                type='number'
                                                className='form-control'
                                                id='validationCustom05'
                                                required
                                                name='name'
                                            />
                                        </div>

                                        <div className='col-md-4 mb-3'>
                                            <label htmlFor='validationCustom05' className='form-label'>
                                                Giá phòng
                                            </label>
                                            <input
                                                type='number'
                                                className='form-control'
                                                id='validationCustom05'
                                                required
                                                name='name'
                                            />
                                        </div>
                                        <div className='col-md-4'>
                                            <label htmlFor='validationCustom05' className='form-label'>
                                                Điểm nổi bật
                                            </label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                id='validationCustom05'
                                                required
                                                name='name'
                                            />
                                        </div>
                                        <div>
                                            <button className="ms-2 btn btn-danger float-end" type="submit">
                                                Xóa Phòng
                                            </button>
                                            <button className="btn btn-primary float-end" type="submit">
                                                Cập Nhật
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
