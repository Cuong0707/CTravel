import React from 'react';
import ReactDOM from 'react-dom';
import EngineeringIcon from '@mui/icons-material/Engineering';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default function ModalUser() {
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
                <h3 ref={(_subtitle) => (subtitle = _subtitle)}>Edit users</h3>
                {/* <button onClick={closeModal}>close</button> */}
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="ms-5">
                                <input type="file" accept="image/*" onChange={""}
                                    style={{ display: "none" }} id="fileInput" />
                                <label htmlFor="fileInput">
                                    <img src={""} className="rounded-circle"
                                        style={{ width: "100px", cursor: "pointer", }}
                                        alt="Avatar"
                                        title="Click to choose file"
                                    />
                                </label>
                            </div>
                            <div className="mt-2">
                                <div className="form-group row">
                                    <label htmlFor="regisDay" className="col-7 col-form-label">Registration Date:</label>
                                    <div className="col-5">
                                        <input type="text" className="form-control-plaintext" id="regisDay" disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <div className="form-group row">
                                    <label htmlFor="last_login" className="col-7 col-form-label">Last Login:</label>
                                    <div className="col-5">
                                        <input type="text" id="last_login" className="form-control-plaintext" disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={""}>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="fullname" className="form-label">
                                                    Fullname
                                                </label>
                                                <input type="text" id="fullname" name="fullname" className="form-control" required />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="phone_number" className="form-label">
                                                    Phone Number
                                                </label>
                                                <input type="number" id="phone_number" name="phone_number" className="form-control" required />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="email" className="form-label">
                                                    Email
                                                </label>
                                                <input type="email" id="email" name="email" className="form-control" required
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="birthday" className="form-label">
                                                    Birthday
                                                </label>
                                                <input type="date" id="birthday" name="birthday" className="form-control" required />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="address" className="form-label">
                                                    Address
                                                </label>
                                                <input type="text" id="address" name="address" className="form-control" required
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="district_id" className="form-label">
                                                    District ID
                                                </label>
                                                <input type="text" id="district_id" name="district_id" className="form-control" required
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="status" className="form-label">
                                                    Status
                                                </label>
                                                <input type="text" id="status" name="status" className="form-control" required disabled
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="role" className="form-label">
                                                    Role
                                                </label>

                                                <select className="form-control" id="role" name="role">
                                                    <option>user</option>
                                                    <option>admin</option>
                                                    <option>partner</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="ms-2 btn btn-danger float-end" type="submit">
                                                Cấm Tài Khoản
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
