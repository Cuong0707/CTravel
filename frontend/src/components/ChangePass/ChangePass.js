import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../style/ChangePass.scss'
import { AuthContext } from '../../context/auth-context';
// import { EyeFill } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChangePass() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { changePassword } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return console.error(error);
    }
    try {
      await changePassword(oldPassword, newPassword); // Pass oldPassword and newPassword only
      alert('Password changed successfully');
      navigate('/');
      // Optionally, you may set a success message or handle success state here
    } catch (error) {
      console.error(error);
      toast.error('Vui Lòng Kiểm Tra Lại', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setError('Failed to change password. Please try again.');
    }
  };

  return (
    <div className='container-forgot'>
      <ToastContainer />

      <form onSubmit={handleSubmit}>
        <div className="card text-center">
          <div className="card-header h5 text-white bg-primary">Đổi Mật Khẩu</div>
          <div className="card-body px-5">
            <p className="card-text py-2">
              Nhập Các Thông Tin Để Thay Đổi Mật Khẩu Mới
            </p>
            <div className="form-outline">

              <input type="password" value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)} id="typePass1" placeholder='Mật Khẩu Cũ' className="form-control my-3" />

              <input
                type="password" // Sử dụng conditional (ternary) operator để thay đổi kiểu input
                id="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} placeholder='Mật Khẩu Mới' className="form-control" />


              <input type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Xác Nhận Mật Khẩu Mới' className="form-control my-3" />
              {newPassword !== confirmPassword && <p style={{ color: 'red' }}>Mật khẩu không trùng khớp</p>} {/* Hiển thị thông báo nếu mật khẩu không khớp */}
            </div>
            <button type="submit" className="btn btn-primary w-100">Xác Nhận</button>

          </div>
        </div>
      </form>
    </div>
  );
}

export default ChangePass;
