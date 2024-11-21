import React from 'react';
import ReactDOM from 'react-dom';
import BadgeIcon from '@mui/icons-material/Badge';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '35%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default function ModalOrder() {
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
            <button className='btn btn-success' onClick={openModal}><BadgeIcon /></button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h3 ref={(_subtitle) => (subtitle = _subtitle)}>Order details</h3>
                {/* <button onClick={closeModal}>close</button> */}
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
                        <div>
                            <button className="ms-2 btn btn-danger float-end">
                                Đóng
                            </button>
                            <button className="btn btn-primary float-end">
                                Xuất File
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
