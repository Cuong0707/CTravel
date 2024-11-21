import { useState } from 'react'
import ActionButtons from '../ActionButtons'

const PartnerStep = ({ handleChange }) => {
    const [formState, setFormState] = useState({
        nameOfCompany: '',
        email: '',
        serviceId: '',
        taxCode: '',
        website: ''
    })
    const [imageFile, setImageFile] = useState(null)
    const [licenseFile, setLicenseFile] = useState(null)
    const [error, setError] = useState('')

    const handleInputChange = (event) => {
        const targetName = event.target.name
        const targetValue = event.target.value

        setFormState((prev) => ({
            ...prev,
            [targetName]: targetValue
        }))
    }

    const handleChangeImage = (event) => {
        const file = event.target.files[0]
        setImageFile(file)
    }

    const handleChangeLicense = (event) => {
        const file = event.target.files[0]
        setLicenseFile(file)
    }
    // Write validate function
    const validateForm = () => {
        return true
    }

    const handleNextStep = () => {
        if (validateForm()) {
            handleChange('partner', { ...formState, imageFile, licenseFile }, 1)
        }
    }

    return (
        <div className='row d-flex ms-2 me-2'>
            <span style={{ color: 'red' }}>{error}</span>
            <div className='col-md-6 mb-3'>
                <label htmlFor='validationCustom01' className='form-label'>
                    Website
                </label>
                <input
                    type='text'
                    className='form-control'
                    name='website'
                    onChange={handleInputChange}
                    id='validationCustom01'
                    required
                />
            </div>
            <div className='col-md-6'>
                <label htmlFor='validationCustom02' className='form-label'>
                    Tên doanh nghiệp
                </label>
                <input
                    type='text'
                    className='form-control'
                    id='validationCustom02'
                    required
                    name='nameOfCompany'
                    onChange={handleInputChange}
                />
            </div>
            <div className='col-md-4'>
                <label htmlFor='validationCustomUsername' className='form-label'>
                    Email
                </label>
                <div className='input-group has-validation'>
                    <span className='input-group-text' id='inputGroupPrepend'>
                        @
                    </span>
                    <input
                        type='email'
                        className='form-control'
                        id='validationCustomUsername'
                        aria-describedby='inputGroupPrepend'
                        required
                        name='email'
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className='col-md-4 mb-3'>
                <label htmlFor='validationCustom03' className='form-label'>
                    Dịch vụ
                </label>
                <select
                    name='serviceId'
                    value={formState.serviceId}
                    onChange={handleInputChange}
                    className='form-select'
                    id='validationCustom04'
                    required
                >
                    <option defaultValue>Chọn...</option>
                    <option value='S01'>Khách sạn</option>
                    <option value='S02'>Nhà hàng</option>
                    <option value='S03'>Phương tiện di chuyển</option>
                    <option value='S04'>Địa điểm du lịch</option>
                </select>
            </div>
            <div className='col-md-4'>
                <label htmlFor='validationCustom05' className='form-label'>
                    Tax code
                </label>
                <input
                    name='taxCode'
                    onChange={handleInputChange}
                    type='number'
                    className='form-control'
                    id='validationCustom05'
                    required
                />
            </div>
            <div className='mb-3 col-md-6'>
                <label htmlFor='formFile' className='form-label'>
                    Hình ảnh doanh nghiệp
                </label>
                <input onChange={handleChangeImage} className='form-control' type='file' id='formFile' />
                {imageFile && <p>Selected File: {imageFile.name}</p>}
            </div>
            <div className='mb-3 col-md-6'>
                <label htmlFor='formFile' className='form-label'>
                    Giấy phép kinh doanh
                </label>
                <input onChange={handleChangeLicense} className='form-control' type='file' id='formFile' />
                {licenseFile && <p>Selected File: {licenseFile.name}</p>}
            </div>

            <br />
            <div className='d-flex justify-content-end mb-2 mt-3'>
                <ActionButtons onClick={handleNextStep} className='btn btn-primary' />
            </div>
        </div>
    )
}

export default PartnerStep
