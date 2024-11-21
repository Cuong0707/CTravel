import React, { useState } from 'react';
import '../../style/Login.scss'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import authApi from '../../api/auth.api';
import useHttpErrorHandler from '../../hook/useHttpErrorHandler';
import addressApi from '../../api/address.api';
import useAppContext from '../../hook/useAppContext';
import { setAccessTokenToLS, setProfileToLS } from '../../utils/auth.utils';

function SignUp() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true); // State để lưu trạng thái xác nhận mật khẩu
    const [districtId, setDistrictId] = useState('')
    const [provinceId, setProvinceId] = useState("")
    const [formData, setFormData] = useState({
        fullname: '',
        password: '',
        email: '',
        districtId: '',
        confirmPassword: ''
    });
    const { handleError } = useHttpErrorHandler();
    const { setProfile, setIsAuthenticated } = useAppContext()
    // const handlePasswordChange = (event) => {
    //     setPassword(event.target.value);
    // };

    const handleConfirmPasswordChange = (event) => {
        // setConfirmPassword(event.target.value);
        // setPasswordMatch(event.target.value === password); // Kiểm tra xem mật khẩu xác nhận có khớp với mật khẩu mới hay không
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    //Fetching province
    const fetchProvince = useQuery({
        queryKey: ['fetchALlProvince'],
        queryFn: () => {
            return addressApi.getALlProvince()
        },
        onSuccess: (res) => {
            const lsProvince = res.data
            if (lsProvince?.length > 0) {
                setProvinceId(lsProvince[0].provinceID)
            }
        }
    })
    //Fetching district
    const fetchDistrict = useQuery({
        queryKey: ['fetchAllDistrict', provinceId],
        queryFn: () => {
            if (provinceId) {
                return addressApi.getDistrictByProvince(provinceId)
            } else {
                return Promise.resolve([])
            }
        },
        onSuccess: () => {
            setDistrictId("")
        }
    })
    // Handle Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSubmitMutation.mutate(formData);
    }
    const handleSubmitMutation = useMutation({
        mutationFn: (formData) => {
            return authApi.register({ ...formData, districtId })
        },
        onSuccess: (data) => {
            const { infoUser, token } = data
            setProfile(infoUser)
            setIsAuthenticated(true);
            setAccessTokenToLS(token);
            setProfileToLS(infoUser)
        },
        onError: (error) => {
            const resError = handleError(error)
            if (resError?.data?.message) {
                alert(resError.data.message)
            }
        }
    })

    return (
        <form onSubmit={handleSubmit}>
            <div className='container-login'>
                <div className="container my-3 ">
                    <div className='card shadow p-3 mb-5 bg-white rounded'>
                        <div className='g-0 row'>
                            <div className='col-md-6'>
                                <img src='images/images-signup.png' alt="login form" style={{ height: "600px", width: "630px" }} className="rounded-start" />
                            </div>
                            <div className='col-md-5 m-auto'>
                                <h1 className="fw-normal my-4 fw-bold text-center">Đăng Ký</h1>
                                <div className='card-body d-flex flex-column'>
                                    <form method=''>
                                        <div className="row mb-3">
                                            <div className='col-6'>
                                                <label htmlFor='label1' className='mb-2'>Họ Và Tên</label>
                                                <input type="text" name="fullname" className='form-control' value={formData.fullname} onChange={handleChange} />
                                            </div>

                                            <div className='col-6'>
                                                <label htmlFor='label2' className='mb-2'>Email</label>
                                                <input type="email" name="email" className='form-control' value={formData.email} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <div className="col">
                                                <label htmlFor="province" className="form-label">Tỉnh</label>
                                                <select
                                                    value={provinceId}
                                                    onChange={(e) => {
                                                        setProvinceId(e.target.value)
                                                    }}
                                                    name="districtId" className="form-select" defaultValue='Choose...'>
                                                    {fetchProvince?.data?.data?.map(province => {
                                                        const { provinceID, nameOfProvince } = province
                                                        return <option key={provinceID} value={provinceID}>{nameOfProvince}</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="district" className="form-label">Quận/Huyện</label>
                                                <select
                                                    value={districtId}
                                                    onChange={(e) => {
                                                        console.log(e.target.value)
                                                        setDistrictId(e.target.value)
                                                    }}
                                                    id="district"
                                                    className="form-select"
                                                    defaultValue=""
                                                >
                                                    <option value="">Choose...</option>
                                                    {fetchDistrict?.data?.data?.map(district => {
                                                        const { districtID, nameOfDistrict } = district
                                                        return <option key={districtID} value={districtID}>{nameOfDistrict}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Mật Khẩu</label>
                                            <input type="password" name="password"
                                                id="password"
                                                value={formData.password} onChange={handleChange} className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="confirmPassword" className="form-label">Xác Nhận Mật Khẩu</label>
                                            <input type="password" name="confirmPassword"
                                                id="confirmPassword"
                                                value={formData.confirmPassword} onChange={handleConfirmPasswordChange} className="form-control" />
                                            {!passwordMatch && <p style={{ color: 'red' }}>Mật Khẩu Không Trùng Khớp</p>} 
                                        </div>

                                        <div className='row'>

                                            <Link className=" fw-bold col-6" to="/forgot-password" >
                                                Quên Mật Khẩu?
                                            </Link>

                                            <h6 className="col-6 mb-3 fw-bold">
                                                Đã Có Tài Khoản ?{" "}
                                                <Link className="" to="/login">
                                                    <u>Đăng Nhập</u>
                                                </Link>
                                            </h6>
                                        </div>
                                    </form>
                                    <div className='row'>
                                    </div>
                                    <button className="btn btn-success col-5 m-auto" type='submit'>Xác Nhận</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default SignUp;