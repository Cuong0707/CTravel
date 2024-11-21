import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';


function ConfirmPassword() {
    const { resetPassword } = useContext(AuthContext);
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const token = params.get('t');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password === confirmPassword) {

            try {
                await resetPassword(token, password);
                window.location.href = '/login';
            } catch (error) {
                console.error(error);
            }
        } else {
            setPasswordMatch(false);
        }

    };




    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    return (
        <div className='container-forgot'>
            <div className="card">
                <div className="card-header h5 text-white bg-primary text-center">Xác Nhận Mật Khẩu Mới</div>
                <div className="card-body px-5">
                    <form onSubmit={handleSubmit}>
                        <p className="card-text">
                            Mật Khẩu Mới
                        </p>
                        <div className="form-outline">
                            <input type="password" value={password} onChange={handlePasswordChange} placeholder='Password' className="form-control my-3" />
                        </div>
                        <p className="card-text">
                            Xác Nhận Mật Khẩu Mới
                        </p>
                        <div className="form-outline">
                            <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder='ConfirmPassword' className="form-control my-3" />
                            {!passwordMatch && <p style={{ color: 'red' }}>Password and Confirm Password do not match.</p>}
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Xác Nhận</button>
                        <div className="d-flex justify-content-between mt-4">
                            <Link to="/login">Đăng Nhập</Link>
                            <Link to="/register">Đăng Ký</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ConfirmPassword;