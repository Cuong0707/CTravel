import React, { useState, useEffect, useContext } from 'react'
import { Box } from '@mui/material'
import Dashboard from './Dashboard'
import Toolbar from '@mui/material/Toolbar'
import { AuthContext } from '../../context/auth-context'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ModalOrderPending from './Modal/ModalOrderPending'
import partnerApi from '../../api/partner.api'
import { useMutation, useQuery } from 'react-query'

const drawerWidth = 240
export default function ListOrder() {
    const [orders, setOrders] = useState([])
    const { refetch } = useQuery({
        queryKey: ['getOrderByPartner'],
        queryFn: () => {
            return partnerApi.filterOrder()
        },
        onSuccess: (res) => {
            setOrders(res.data.content)
        }
    })
    const handleChangeStatus = useMutation({
        mutationFn: ({ id, status }) => {
            return partnerApi.updateStatus(id, status)
        },
        onSuccess: (res) => {
            console.log(res)
            refetch()
        }
    })

    return (
        <div>
            <div className='container mt-4'>
                <ToastContainer />
                <Box sx={{ display: 'flex' }}>
                    <Dashboard />
                    <Box
                        component='main'
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            width: { sm: `calc(100% - ${drawerWidth}px)` },
                            marginTop: '30px'
                        }}
                    >
                        <Toolbar />
                        <div className='h2 mt-3 fw-bold text-uppercase'>Đơn Hàng Đợi Duyệt</div>
                        <div className='row justify-content-center'>
                            <table className='table table-hover table-bordered'>
                                <thead>
                                    <tr className='table-info  text-center'>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Loại dịch vụ</th>
                                        <th scope='col'>Tên Dịch Vụ</th>
                                        <th scope='col'>Địa chỉ</th>
                                        <th scope='col'>Thanh toán</th>
                                        <th scope='col'>Thời gian</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => {
                                        console.log(order)
                                        const { service, hotelName, hotelAddress } = order
                                        return (
                                            <tr key={order.order.orderID}>
                                                <th scope='row'>{index + 1}</th>
                                                <td>{service}</td>
                                                <td>{hotelName}</td>
                                                <td>{hotelAddress}</td>
                                                <td>{order.order.paymentMethod}</td>
                                                <td>{order.order.orderDate}</td>
                                                <td>
                                                    {order.order.status === 'pending' &&
                                                        !handleChangeStatus.isLoading && (
                                                            <>
                                                                <button
                                                                    onClick={() => {
                                                                        handleChangeStatus.mutate({
                                                                            id: order.order.orderID,
                                                                            status: 'confirmed'
                                                                        })
                                                                    }}
                                                                    type='button'
                                                                    className='btn btn-primary me-2'
                                                                >
                                                                    Duyệt
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        handleChangeStatus.mutate({
                                                                            id: order.order.orderID,
                                                                            status: 'canceled'
                                                                        })
                                                                    }}
                                                                    type='button'
                                                                    className='btn btn-danger'
                                                                >
                                                                    Hủy
                                                                </button>
                                                            </>
                                                        )}
                                                    {handleChangeStatus.isLoading && <div>...Waiting</div>}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Box>
                </Box>
            </div>
        </div>
    )
}
