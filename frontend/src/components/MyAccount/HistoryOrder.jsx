import React, { useState } from 'react'
import MyAccount from './MyAccount'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Modal from 'react-bootstrap/Modal'
import useQueryConfig from '../../hook/useQueryConfig'
import { useMutation, useQuery } from 'react-query'
import orderApi from '../../api/order.api'
import OrderDetail from './OrderDetail'

const drawerWidth = 240

export default function HistoryOrder() {
    const queryConfig = useQueryConfig()
    const [orders, setOrders] = useState([])
    const [orderDetails, setOrderDetails] = useState([])
    const [order, setOrder] = useState(null)
    const [filter, setFilter] = useState({
        startDate: '',
        endDate: ''
    })

    const handleFilterChange = (key) => {
        return (e) => {
            setFilter((prev) => {
                return { ...prev, [key]: e.target.value }
            })
        }
    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getOrders'],
        queryFn: () => {
            return orderApi.getOrderByUser(queryConfig)
        },
        onSuccess: (res) => {
            setOrders(res.data.content)
        }
    })
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = (orderDetails, order) => {
        setShow(true)
        setOrder(order)
        setOrderDetails(orderDetails)
    }

    const handleFilterOrder = useMutation({
        mutationFn: () => {
            return orderApi.filterOrder(filter)
        },
        onSuccess: (res) => {
            setOrders(res.data.content)
        }
    })

    const handleFilterClick = () => {
        if (filter.startDate && filter.endDate) {
            handleFilterOrder.mutate()
        }
    }

    const handleReset = () => {
        refetch()
    }

    const handleCancellOrder = useMutation({
        mutationFn: () => {
            return orderApi.cancelledOrder(order?.order?.orderID)
        },
        onSuccess: (res) => {
            handleClose()
            refetch()
            setOrder(null)
        }
    })

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <MyAccount />
                <Box
                    component='main'
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, marginTop: '30px' }}
                >
                    <Toolbar />
                    <div className='container mt-4'>
                        <div className='row justify-content-md-center'>
                            <div className='card'>
                                <div className='card-body'>
                                    <div className='mt-3 form-group row'>
                                        <label htmlFor='time' className='h4 col-md-2'>
                                            Thời Gian<span className='text-danger'>*</span>
                                        </label>
                                        <div className='col-md-5'>
                                            <input
                                                value={filter.startDate}
                                                onChange={handleFilterChange('startDate')}
                                                type='date'
                                                className='form-control'
                                                placeholder='Chọn'
                                            />
                                        </div>
                                        <div className='col-md-5'>
                                            <input
                                                value={filter.endDate}
                                                onChange={handleFilterChange('endDate')}
                                                type='date'
                                                className='form-control'
                                                placeholder='Chọn'
                                            />
                                        </div>
                                    </div>

                                    <div className='text-end mt-3'>
                                        <button onClick={handleReset} className='btn btn-secondary'>
                                            Tạo Lại
                                        </button>
                                        <button onClick={handleFilterClick} className='ms-2 btn btn-primary'>
                                            Xác Nhận
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='h2 mt-3 fw-bold text-uppercase'>Lịch Sử Giao Dịch</div>
                        <div className='row justify-content-md-center'>
                            <table className='table table-hover table-bordered'>
                                <thead>
                                    <tr className='table-info text-uppercase fw-bold text-center'>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Loại Dịch Vụ</th>
                                        <th scope='col'>Tên Dịch Vụ</th>
                                        <th scope='col'>Địa Chỉ</th>
                                        <th scope='col'>Phương thức thanh toán</th>
                                        <th scope='col'>Thời Gian</th>
                                        <th scope='col'>Trạng Thái</th>
                                        <th scope='col'>Chi Tiết</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((orderItem, index) => {
                                        const { order, service, hotelName, hotelAddress } = orderItem

                                        return (
                                            <tr key={order.orderID}>
                                                <th scope='row'>{index + 1}</th>
                                                <td>{service}</td>
                                                <td>{hotelName}</td>
                                                <td>{hotelAddress}</td>
                                                <td>{order.paymentMethod}</td>
                                                <td>{order.orderDate}</td>
                                                <td>{order.status}</td>
                                                <td className='text-center'>
                                                    <button
                                                        className='btn text-info'
                                                        onClick={() => {
                                                            handleShow(order.ordersOfHotels, orderItem)
                                                        }}
                                                    >
                                                        <ArrowForwardIcon />
                                                    </button>
                                                    <Modal size='lg' show={show} onHide={handleClose}>
                                                        <OrderDetail
                                                            onCancellOrder={handleCancellOrder.mutate}
                                                            order={order}
                                                            orderDetail={orderDetails}
                                                            isLoading={handleCancellOrder.isLoading}
                                                        />
                                                    </Modal>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Box>
            </Box>
        </div>
    )
}
