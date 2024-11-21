import React, { useState, useEffect, useContext } from 'react'
import { Box, Modal } from '@mui/material'
import Dashboard from './Dashboard'
import Toolbar from '@mui/material/Toolbar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import adminApi from '../../api/admin.api'
import { useMutation, useQuery } from 'react-query'
import { generateImageFromFileName } from '../../utils/utils'

const drawerWidth = 240
export default function ListUser() {
    const [users, setUsers] = useState([])

    const { refetch } = useQuery({
        queryKey: ['fetchAllUsers'],
        queryFn: () => {
            return adminApi.getAllUser()
        },
        onSuccess: (res) => {
            console.log(res.data.data)
            setUsers(res.data.data)
        }
    })

    const handleUpdateUserStatus = useMutation({
        mutationFn: (id) => {
            return adminApi.updateUserActiveStatus(id)
        },
        onSuccess: (res) => {
            console.log(res)
            refetch()
        },
        onError: (err) => {
            console.log(err)
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
                        <div className='h2 mt-3 fw-bold text-uppercase'>Danh Sách Người Dùng</div>
                        <div className='row justify-content-center'>
                            <table className='table table-hover table-bordered'>
                                <thead>
                                    <tr className='table-info  text-center'>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Họ Và Tên</th>
                                        <th scope='col'>Hình Ảnh</th>
                                        <th scope='col'>Số Điện Thoại</th>
                                        <th scope='col'>Email</th>
                                        <th scope='col'>Ngày Sinh</th>
                                        <th scope='col'>Địa Chỉ</th>
                                        <th scope='col'>Ngày Đăng Ký</th>
                                        <th scope='col'>Trạng Thái</th>
                                        <th scope='col'>Vai Trò</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => {
                                        const {
                                            userID,
                                            fullname,
                                            avatar,
                                            phone_number,
                                            registrationDate,
                                            email,
                                            address,
                                            birthday,
                                            role,
                                            status
                                        } = user
                                        return (
                                            <tr key={userID}>
                                                <th scope='row'>{index + 1}</th>
                                                <td>{fullname}</td>
                                                <td>
                                                    <img
                                                        style={{ width: 50, height: 50, margin: 'auto' }}
                                                        src={generateImageFromFileName(avatar)}
                                                        alt='hinh-user'
                                                    />
                                                </td>
                                                <td>{phone_number}</td>
                                                <td>{email}</td>
                                                <td>{birthday}</td>
                                                <td>{address}</td>
                                                <td>{registrationDate}</td>
                                                <td>{status}</td>
                                                <td>{role}</td>
                                                <td>
                                                    {!handleUpdateUserStatus.isLoading && (
                                                        <button
                                                            className={`btn ${
                                                                status !== 'active' ? 'btn-primary' : 'btn-danger'
                                                            }`}
                                                            onClick={() => {
                                                                handleUpdateUserStatus.mutate(userID)
                                                            }}
                                                        >
                                                            {status === 'active' ? 'Block' : 'Unblock'}
                                                        </button>
                                                    )}
                                                    {handleUpdateUserStatus.isLoading && '...Loading'}
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
