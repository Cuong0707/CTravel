import { useState } from 'react'
import addressApi from '../../api/address.api'
import { useQuery } from 'react-query'

function AddressForm({ className = '', onChange = () => {}, initialValue = -1 }) {
    const [districtId, setDistrictId] = useState(initialValue)
    const [provinceId, setProvinceId] = useState('')

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
            setDistrictId('')
        }
    })

    return (
        <div className={`row ${className}`}>
            <div className='col-6'>
                <label htmlFor='province' className='form-label'>
                    Tỉnh
                </label>
                <select
                    value={provinceId}
                    onChange={(e) => {
                        setProvinceId(e.target.value)
                    }}
                    className='form-select'
                    defaultValue='Choose...'
                >
                    {fetchProvince?.data?.data?.map((province) => {
                        const { provinceID, nameOfProvince } = province
                        return (
                            <option key={provinceID} value={provinceID}>
                                {nameOfProvince}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div className='col-6'>
                <label htmlFor='district' className='form-label'>
                    Quận/Huyện
                </label>
                <select
                    value={districtId}
                    onChange={(e) => {
                        setDistrictId(e.target.value)
                        onChange(e)
                         console.log(e.target.value)
                    }}
                    id='district'
                    className='form-select'
                    defaultValue=''
                >
                    <option value=''>Choose...</option>
                    {fetchDistrict?.data?.data?.map((district) => {
                        const { districtID, nameOfDistrict } = district
                        return (
                            <option key={districtID} value={districtID}>
                                {nameOfDistrict}
                            </option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export default AddressForm
