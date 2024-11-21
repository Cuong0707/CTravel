import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography
} from 'mdb-react-ui-kit'
import React from 'react'

export default function OrderDetail({ orderDetail, order, onCancellOrder, isLoading = false }) {
    return (
        <>
            <section className='gradient-custom' style={{ backgroundColor: '#eee' }}>
                <MDBContainer className='py-5 mt-3'>
                    <MDBRow className='justify-content-center align-items-center'>
                        <MDBCol lg='12'>
                            <MDBCard className='border border-0' style={{ borderRadius: '10px' }}>
                                <MDBCardHeader className='px-3 py-4'>
                                    <MDBTypography tag='h5' className='text-muted mb-0'>
                                        Cảm ơn vì đã sử dụng dịch vụ, <span style={{ color: '#a8729a' }}>Anna</span>!
                                    </MDBTypography>
                                </MDBCardHeader>
                                <MDBCardBody className='p-3'>
                                    <div className='d-flex justify-content-between align-items-center mb-3'>
                                        <p className='lead fw-normal mb-0' style={{ color: '#a8729a' }}>
                                            Biên lai
                                        </p>
                                    </div>

                                    <MDBCard className='shadow-0 border mb-2'>
                                        <MDBCardBody>
                                            <MDBRow>
                                                <MDBCol
                                                    md='2'
                                                    className='text-center d-flex justify-content-center align-items-center'
                                                >
                                                    <p className='text-muted mb-0'>Loại phòng</p>
                                                </MDBCol>
                                                <MDBCol
                                                    md='2'
                                                    className='text-center d-flex justify-content-center align-items-center'
                                                >
                                                    <p className='text-muted mb-0 small'>Số lượng người</p>
                                                </MDBCol>
                                                <MDBCol
                                                    md='2'
                                                    className='text-center d-flex justify-content-center align-items-center'
                                                >
                                                    <p className='text-muted mb-0 small'>Số trẻ em</p>
                                                </MDBCol>
                                                <MDBCol
                                                    md='2'
                                                    className='text-center d-flex justify-content-center align-items-center'
                                                >
                                                    <p className='text-muted mb-0 small'>Thời gian lưu trú</p>
                                                </MDBCol>
                                                <MDBCol
                                                    md='2'
                                                    className='text-center d-flex justify-content-center align-items-center'
                                                >
                                                    <p className='text-muted mb-0 small'>Giá</p>
                                                </MDBCol>
                                            </MDBRow>
                                            {orderDetail.map((hotelDetail) => {
                                                const {
                                                    numberOfChildren,
                                                    numberOfPeople,
                                                    originalPrice,
                                                    hotelDetailId,
                                                    lengthOfStay,
                                                    typeOfRoom
                                                } = hotelDetail
                                                return (
                                                    <MDBRow key={hotelDetailId}>
                                                        <MDBCol
                                                            md='2'
                                                            className='text-center d-flex justify-content-center align-items-center'
                                                        >
                                                            <p className='text-muted mb-0'>{typeOfRoom}</p>
                                                        </MDBCol>
                                                        <MDBCol
                                                            md='2'
                                                            className='text-center d-flex justify-content-center align-items-center'
                                                        >
                                                            <p className='text-muted mb-0 small'> {numberOfPeople}</p>
                                                        </MDBCol>
                                                        <MDBCol
                                                            md='2'
                                                            className='text-center d-flex justify-content-center align-items-center'
                                                        >
                                                            <p className='text-muted mb-0 small'>{numberOfChildren}</p>
                                                        </MDBCol>
                                                        <MDBCol
                                                            md='2'
                                                            className='text-center d-flex justify-content-center align-items-center'
                                                        >
                                                            <p className='text-muted mb-0 small'>{lengthOfStay}</p>
                                                        </MDBCol>
                                                        <MDBCol
                                                            md='2'
                                                            className='text-center d-flex justify-content-center align-items-center'
                                                        >
                                                            <p className='text-muted mb-0 small'>{originalPrice}</p>
                                                        </MDBCol>
                                                    </MDBRow>
                                                )
                                            })}
                                            <hr className='mb-2' style={{ backgroundColor: '#e0e0e0', opacity: 1 }} />
                                        </MDBCardBody>
                                    </MDBCard>

                                    <div className='d-flex justify-content-between'>
                                        <p className='text-muted mb-0'>Ngày lập hóa đơn: {order?.orderDate}</p>
                                        {order?.status !== 'canceled' && (
                                            <button onClick={onCancellOrder} className='btn btn-danger'>
                                                {isLoading ? '...Loading' : 'Hủy'}
                                            </button>
                                        )}
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    )
}
