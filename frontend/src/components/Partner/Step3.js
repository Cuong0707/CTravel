import React, { useState } from 'react';
import MyModal from './Modal';
import '../../style/Step3.scss'

const FormFields = () => {
  const [fields, setFields] = useState([{ roomType: '', roomPrice: '' }]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [name]: value };
    setFields(updatedFields);
  };

  const handleAddField = () => {
    setFields([...fields, { roomType: '', roomPrice: '' }]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderFields = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFields = fields.slice(startIndex, endIndex);

    return currentFields.map((field, index) => (
      <div className={`row ${index !== currentFields.length - 1 ? 'fade-card' : ''}`} key={index}>
        <div className="col-md-7 mb-3 m-auto">
          <div className={`card ${index !== currentFields.length - 1 ? 'fade-card' : ''}`}>
            <div className="card-body">
              <select
                className="form-select"
                name="roomType"
                value={field.roomType}
                onChange={(event) => handleChange(index + startIndex, event)}
              >
                <option defaultValue disabled>Chọn loại phòng</option>
                <option value="phongDon">Phòng đơn</option>
                <option value="phongDoi">Phòng đôi</option>
                <option value="phongGiaDinh">Phòng gia đình</option>
                <option value="suiteKing">Suite king</option>
                <option value="deluxe">Deluxe</option>
                <option value="phongTieuChuan">Phòng Tiêu Chuẩn</option>
                <option value="phongCaoCap">Phòng Cao Cấp</option>
                <option value="phongHangSang">Phòng Hạng Sang</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className={`card ${index !== currentFields.length - 1 ? 'fade-card' : ''}`}>
            <div className="card-body">
              {/* // <input
              //   type="number"
              //   className="form-control"
              //   name="roomPrice"
              //   value={field.roomPrice}
              //   onChange={(event) => handleChange(index + startIndex, event)}
              //   placeholder="Giá phòng"
              // /> */}
              <MyModal />
            </div>
          </div>
        </div>


        <div className="col-md-2 text-center">
          <div className={`card ${index !== currentFields.length - 1 ? '' : ''}`}>
            <div className="card-body">
              {index + startIndex === fields.length - 1 ? (
                <button className="btn-them btn btn-primary w-75" onClick={handleAddField}>
                  Thêm
                </button>
              ) : (
                <button className="btn btn-danger w-75" onClick={() => handleRemoveField(index + startIndex)}>
                  Xóa
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(fields.length / itemsPerPage);
    const pageNumbers = Array.from(Array(totalPages), (_, i) => i + 1);

    return (
      <nav aria-label="Pagination" style={{ background: "white" }}>
        <ul className="pagination ">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
              Trang Trước
            </button>
          </li>
          {pageNumbers.map((pageNumber) => (
            <li className={`page-item ${pageNumber === currentPage ? 'active' : ''}`} key={pageNumber}>
              <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
                {pageNumber}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
              Trang Kế
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div className="container">
      {renderFields()}
      {fields.length >= itemsPerPage && (
        <div className="d-flex justify-content-center mt-4">
          {renderPagination()}
        </div>
      )}
    </div>
  );
};

export default FormFields;
