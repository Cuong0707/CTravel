import React, { useEffect, useState } from 'react'
import { Stepper, Step } from 'react-form-stepper'
import { MdDescription, MdMosque, MdPinDrop, MdLockClock } from 'react-icons/md'
import PartnerStep from './Step/PartnerStep'
import ServiceStep from './Step/ServiceStep'
import CompanyStep from './Step/CompanyStep'
import NotificationStep from './Step/NotificationStep'
import { omit } from 'lodash'
import { convertToBlob } from '../../utils/utils'
import { useMutation } from 'react-query'
import partnerApi from '../../api/partner.api'
import useHttpErrorHandler from '../../hook/useHttpErrorHandler'

const Sample = () => {
    const [formState, setFormState] = useState({
        partner: {},
        company: {},
        service: [],
        activeStep: 0
    })
    const [success, setIsSuccess] = useState(false)
    const { handleError } = useHttpErrorHandler()
    const handleFormSateChange = (key, value, index) => {
        setFormState((prev) => {
            return { ...prev, [key]: value, activeStep: index }
        })
    }

    useEffect(() => {
        if (formState.activeStep === 3) {
            handleSubmit()
        }
    }, [formState.activeStep])

    const handleCreatePartner = useMutation({
        mutationFn: (body) => {
            return partnerApi.createPartner(body)
        },
        onSuccess: (res) => {
            setIsSuccess(true)
        },
        onError: (error) => {
            console.log(resError)
            const resError = handleError(error)
            setIsSuccess(false)
        }
    })

    const handleSubmit = () => {
        // Using lodash to remove key 'imageFile', 'licenseFile'
        const partnerRequest = omit(formState.partner, ['imageFile', 'licenseFile'])
        const hotelRequest = formState.company
        hotelRequest.status = 'Available'
        const requestBody = new FormData()
        const lsHotelDetailsRequests = formState.service.map((hotelDetail) => {
            requestBody.append('hotelDetailImages', hotelDetail.photosOfRoom)
            return omit(hotelDetail, ['photosOfRoom'])
        })
        requestBody.append('partner', convertToBlob({ partnerRequest, hotelRequest, lsHotelDetailsRequests }))
        requestBody.append('image', formState.partner.imageFile)
        requestBody.append('license', formState.partner.licenseFile)
        handleCreatePartner.mutate(requestBody)
    }
    const handleFinish = () => {
        console.log('sucess')
    }
    return (
        <>
            <div className='stepper pyro my-3'>
                <div className='before'></div>
                <div className='after'></div>
                <div className='homeStepper'>
                    <h1 className='text-center fs-3 fw-bold text-uppercase text-white bouncing-text'>
                        Trở thành đối tác của chúng tôi
                    </h1>

                    <div className='mt-5 m-auto card w-75'>
                        <Stepper className='fs-4' activeStep={formState.activeStep}>
                            <Step label='Thông Tin Đối Tác' children={<MdDescription />} />
                            <Step label='Thông Tin Doanh Nghiệp' children={<MdPinDrop />} />
                            <Step label='Thông Tin Các Dịch Vụ' children={<MdMosque />} />
                            <Step label='Kết Thúc' children={<MdLockClock />} />
                        </Stepper>
                        {formState.activeStep === 0 && <PartnerStep handleChange={handleFormSateChange} />}
                        {formState.activeStep === 1 && <CompanyStep handleChange={handleFormSateChange} />}
                        {formState.activeStep === 2 && <ServiceStep handleChange={handleFormSateChange} />}
                        {formState.activeStep === 3 && (
                            <NotificationStep
                                isLoading={handleCreatePartner.isLoading}
                                isSuccess={success}
                                handleChange={handleFormSateChange}
                                onFinish={handleFinish}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sample
