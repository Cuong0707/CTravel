import React from 'react';
import ReactDOM from 'react-dom';
import EngineeringIcon from '@mui/icons-material/Engineering';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '56%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default function ModalPartner() {
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
            <button className='btn btn-success' onClick={openModal}><EngineeringIcon /></button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h3 ref={(_subtitle) => (subtitle = _subtitle)}>Edit partner</h3>
                {/* <button onClick={closeModal}>close</button> */}
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="ms-5">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={""}
                                    style={{ display: "none" }}
                                    id="fileInput"
                                />
                                <label htmlFor="fileInput">
                                    <img
                                        src={""}
                                        className="rounded-circle"
                                        style={{
                                            width: "100px",
                                            cursor: "pointer",
                                        }}
                                        alt="Avatar"
                                        title="Click to choose file"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={""}>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <label
                                                    htmlFor="partner_id"
                                                    className="form-label"
                                                >
                                                    Partner ID
                                                </label>
                                                <input
                                                    type="text"
                                                    id="partner_id"
                                                    name="partner_id"
                                                    className="form-control"
                                                    required disabled
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label
                                                    htmlFor="user_id"
                                                    className="form-label"
                                                >
                                                    User ID
                                                </label>
                                                <input
                                                    type="text"
                                                    id="user_id"
                                                    name="user_id"
                                                    className="form-control"
                                                    required
                                                    disabled
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label
                                                    htmlFor="service_id"
                                                    className="form-label"
                                                >
                                                    Service ID
                                                </label>
                                                <input
                                                    type="text"
                                                    id="service_id"
                                                    name="service_id"
                                                    className="form-control"
                                                    required disabled
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label
                                                    htmlFor="name_of_company"
                                                    className="form-label"
                                                >
                                                    Name Company
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name_of_company"
                                                    name="name_of_company"
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label
                                                    htmlFor="tax_code"
                                                    className="form-label"
                                                >
                                                    Tax Code
                                                </label>
                                                <input
                                                    type="number"
                                                    id="tax_code"
                                                    name="tax_code"
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label
                                                    htmlFor="business_lisence"
                                                    className="form-label"
                                                >
                                                    Business Lisence
                                                </label>
                                                <input
                                                    type="text"
                                                    id="business_lisence"
                                                    name="business_lisence"
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label
                                                    htmlFor="website"
                                                    className="form-label"
                                                >
                                                    Website
                                                </label>
                                                <input
                                                    type="text"
                                                    id="website"
                                                    name="website"
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label
                                                    htmlFor="email"
                                                    className="form-label"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label
                                                    htmlFor="status"
                                                    className="form-label"
                                                >
                                                    Status
                                                </label>
                                                <input
                                                    type="text"
                                                    id="status"
                                                    name="status"
                                                    className="form-control"
                                                    required
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <button className="ms-2 btn btn-danger float-end" type="submit">
                                                Cấm Tài Khoản
                                            </button>
                                            <button className="ms-2 btn btn-primary float-end" type="submit">
                                                Cập Nhật
                                            </button>
                                            <button className="btn btn-success float-end" type="submit">
                                                Chấp Nhận
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
