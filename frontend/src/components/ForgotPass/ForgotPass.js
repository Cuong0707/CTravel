import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../style/ForgotPass.scss'
import { AuthContext } from '../../context/auth-context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPass() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { forgotPassword } = useContext(AuthContext);

    const handleSuccess = () => {
        setIsSubmitted(true);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await forgotPassword(email);
            toast.success('Thành Công! Vui lòng kiểm tra email', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            handleSuccess();
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
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    return (
        <div className='container-forgot w-50'>
            <ToastContainer />
            <div className="card text-center">
                <div className="card-header h5 text-white bg-primary">Quên Mật Khẩu</div>
                <div className="card-body px-5">
                    {isSubmitted ? (
                        <p className="card-text py-2">
                            Email của bạn đã được gửi thành công. Vui lòng kiểm tra email.
                        </p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <p className="card-text py-2">
                                Nhập địa chỉ email của bạn.
                            </p>
                            <div className="form-outline">
                                <input type="email" value={email} onChange={handleEmailChange} id="typeEmail" placeholder='Email' className="form-control my-3" disabled={isSubmitted} />
                            </div>
                            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitted}>Gửi</button>
                        </form>
                    )}
                    <div className="d-flex justify-content-between mt-4">
                        <Link to="/login">Đăng Nhập</Link>
                        <Link to="/register">Đăng Ký</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPass;
