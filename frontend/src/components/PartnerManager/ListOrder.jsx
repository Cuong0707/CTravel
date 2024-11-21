import React, { useState, useEffect, useContext } from 'react'
import { Box } from '@mui/material'
import Dashboard from './Dashboard'
import Toolbar from '@mui/material/Toolbar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ModalListOrder from './Modal/ModalListOrder'
import { useQuery } from 'react-query'
import partnerApi from '../../api/partner.api'

const drawerWidth = 240
export default function ListPartner() {
    const [orders, setOrders] = useState([])
    useQuery({
        queryKey: ['getOrderByPartner'],
        queryFn: () => {
            return partnerApi.getOrderByPartner()
        },
        onSuccess: (res) => {
            setOrders(res.data.content)
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
                        <div className='h2 mt-3 fw-bold text-uppercase'>Danh Sách Các Đơn Hàng</div>
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
                                        <th scope='col'>Trạng thái</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => {
                                        const { service, hotelName, hotelAddress } = order
                                        return (
                                            <tr key={order.order.orderID}>
                                                <th scope='row'>{index + 1}</th>
                                                <td>{service}</td>
                                                <td>{hotelName}</td>
                                                <td>{hotelAddress}</td>
                                                <td>{order.order.paymentMethod}</td>
                                                <td>{order.order.orderDate}</td>
                                                <td>{order.order.status}</td>
                                                <td>
                                                    <button
                                                        type='button'
                                                        className='btn btn-primary'
                                                        data-bs-toggle='modal'
                                                        data-bs-target='#myModal'
                                                    >
                                                        <i className='bi bi-gear'></i>
                                                    </button>
                                                    <ModalListOrder />
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
