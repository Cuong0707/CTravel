import { useState } from 'react'
import ActionButtons from '../ActionButtons'
import AddressForm from '../../Address/AddressForm'
import { getCheckInCheckOutTime } from '../../../utils/utils'

const CompanyStep = ({ handleChange = () => {} }) => {
    const [formState, setFormState] = useState({
        districtId: '',
        nameOfHotel: '',
        typeOfHotel: '',
        standard: '',
        status: '',
        breakfast: '',
        serviceFee: '',
        checkIn: '',
        checkOut: '',
        address: '',
        description: '',
        childrenPolicies: '',
        termAndPolicies: ''
    })

    const handleFormChange = (key) => {
        return (e) => {
            setFormState((prev) => {
                return {
                    ...prev,
                    [key]: e.target.value
                }
            })
        }
    }
    const [error, setError] = useState('')

    const validateForm = () => {
        return true
    }

    const handleNextStep = () => {
        if (validateForm()) {
            const newFormState = { ...formState }
            newFormState.checkIn = getCheckInCheckOutTime(newFormState.checkIn)
            newFormState.checkOut = getCheckInCheckOutTime(newFormState.checkOut)
            handleChange('company', newFormState, 2)
        }
    }

    return (
        <div className='row d-flex ms-2 me-2'>
            <span style={{ color: 'red' }}>{error}</span>
            <div className='col-md-4 mb-3'>
                <label htmlFor='validationCustom01' className='form-label'>
                    Tên khách sạn
                </label>
                <input
                    type='text'
                    className='form-control'
                    value={formState.nameOfHotel}
                    onChange={handleFormChange('nameOfHotel')}
                    id='validationCustom01'
                    required
                />
            </div>
            <div className='col-md-4'>
                <label htmlFor='validationCustom02' className='form-label'>
                    Loại khách sạn
                </label>
                <select
                    value={formState.typeOfHotel}
                    onChange={handleFormChange('typeOfHotel')}
                    className='form-select'
                    id='validationCustom04'
                    required
                >
                    <option value={''}>Choose...</option>
                    <option value={'Resort'}>Resort</option>
                    <option value='Khách sạn thương mại'>Khách sạn thương mại</option>
                    <option value='Nhà sàn'>Nhà sàn</option>
                    <option value='Nhà nghỉ bình dân'>Nhà nghỉ bình dân</option>
                    <option value='Căn hộ khách sạn'>Căn hộ khách sạn</option>
                </select>
            </div>
            <div className='col-md-4 mb-3'>
                <label htmlFor='validationCustom03' className='form-label'>
                    Tiêu chuẩn
                </label>
                <select
                    value={formState.standard}
                    onChange={handleFormChange('standard')}
                    className='form-select'
                    id='validationCustom04'
                    required
                >
                    <option value={''} disabled>
                        Chọn...
                    </option>
                    <option value={'1 Sao'}>1 Sao</option>
                    <option value={'2 Sao'}>2 Sao</option>
                    <option value={'3 Sao'}>3 Sao</option>
                    <option value={'4 Sao'}>4 Sao</option>
                    <option value={'5 Sao'}>5 Sao</option>
                </select>
            </div>
            <div className='col-md-4 mb-3'>
                <label htmlFor='validationCustom04' className='form-label'>
                    Check in
                </label>
                <input
                    type='time'
                    className='form-control'
                    name='age'
                    value={formState.checkIn}
                    onChange={handleFormChange('checkIn')}
                    id='validationCustom01'
                    required
                />
            </div>
            <div className='col-md-4'>
                <label htmlFor='validationCustom04' className='form-label'>
                    Check out
                </label>
                <input
                    type='time'
                    className='form-control'
                    name='age'
                    value={formState.checkOut}
                    onChange={handleFormChange('checkOut')}
                    id='validationCustom01'
                    required
                />
            </div>
            <div className='col-md-4'>
                <label htmlFor='validationCustom06' className='form-label'>
                    Bữa sáng
                </label>
                <select
                    value={formState.breakfast}
                    onChange={handleFormChange('breakfast')}
                    className='form-select'
                    id='validationCustom04'
                    required
                >
                    <option value={''} defaultValue>
                        Chọn...
                    </option>
                    <option value={'Bowl'}>Tô ly</option>
                    <option value={'Buffet'}>Buffet</option>
                    <option value={'Excluded'}>Không</option>
                </select>
            </div>
            <AddressForm onChange={handleFormChange('districtId')}  className='col-md-12 mb-4' />
            <div className='col-md-6 mb-3'>
                <label htmlFor='validationCustom07' className='form-label'>
                    Phí dịch vụ
                </label>
                <input
                    type='number'
                    className='form-control'
                    name='age'
                    value={formState.serviceFee}
                    onChange={handleFormChange('serviceFee')}
                    min={0}
                    max={100}
                    id='validationCustom01'
                    required
                />
            </div>
            <div className='col-md-6'>
                <label htmlFor='validationCustom08' className='form-label'>
                    Chính sách cho trẻ em
                </label>
                <input
                    type='text'
                    className='form-control'
                    name='age'
                    value={formState.childrenPolicies}
                    onChange={handleFormChange('childrenPolicies')}
                    id='validationCustom01'
                />
            </div>
            <div className='mb-3 col-md-6'>
                <label htmlFor='validationCustom09' className='form-label'>
                    Mô tả
                </label>
                <textarea
                    type='text'
                    className='form-control'
                    name='age'
                    value={formState.description}
                    onChange={handleFormChange('description')}
                    id='validationCustom01'
                    required
                />
            </div>
            <div className='mb-3 col-md-6'>
                <label htmlFor='validationCustom10' className='form-label'>
                    Chính sách và điều khoản
                </label>
                <input
                    type='text'
                    className='form-control'
                    name='age'
                    value={formState.termAndPolicies}
                    onChange={handleFormChange('termAndPolicies')}
                    id='validationCustom01'
                    required
                />
            </div>

            <br />
            <div className='d-flex justify-content-end mb-2 mt-3'>
                <ActionButtons onClick={handleNextStep} />
            </div>
        </div>
    )
}

export default CompanyStep
