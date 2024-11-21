import React, { useState, useEffect, useContext } from 'react'
import { Box } from '@mui/material'
import Dashboard from './Dashboard'
import Toolbar from '@mui/material/Toolbar'
import { AuthContext } from '../../context/auth-context'
import { stat } from 'fs'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ModalOrder from './Modal/ModalOrder'
import { useQuery } from 'react-query'
import adminApi from '../../api/admin.api'
import { formatCurrency } from '../../utils/utils'

const drawerWidth = 240
export default function ListOrder() {
    const [orders, setOrders] = useState([])

    useQuery({
        queryKey: ['fetchAllOrders'],
        queryFn: () => {
            return adminApi.getAllOrders()
        },
        onSuccess: (res) => {
            console.log(res)
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
                        <div className='h2 mt-3 fw-bold text-uppercase'>Danh Sách Đơn Hàng</div>
                        <div className='row justify-content-center'>
                            <table className='table table-hover table-bordered'>
                                <thead>
                                    <tr className='table-info  text-center'>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Loại dịch vụ</th>
                                        <th scope='col'>Tên Khách Hàng</th>
                                        <th scope='col'>Tên Dịch Vụ</th>
                                        <th scope='col'>Địa chỉ</th>
                                        <th scope='col'>Thanh toán</th>
                                        <th scope='col'>Thời gian</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => {
                                        const { hotelName, hotelAddress, service } = order
                                        return (
                                            <tr key={order.order.orderID}>
                                                <th scope='row'>{index + 1}</th>
                                                <td>{hotelName}</td>
                                                <td>{order.order.userID}</td>
                                                <td>{service}</td>
                                                <td>{hotelAddress}</td>
                                                <td>{formatCurrency(order.order.totalPrice)}</td>
                                                <td>{order.order.orderDate}</td>
                                                <td>
                                                    <button className='btn'>
                                                        <ModalOrder />
                                                    </button>
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
