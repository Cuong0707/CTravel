import React, { useState, useEffect, useContext } from 'react'
import { Box, Modal } from '@mui/material'
import Dashboard from './Dashboard'
import Toolbar from '@mui/material/Toolbar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ModalPartner from './Modal/ModalPartner'
import { useMutation, useQuery } from 'react-query'
import adminApi from '../../api/admin.api'
import { Pagination } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { showErrorMessage } from '../../utils/utils'
const drawerWidth = 240
export default function ListPartner() {
    const navigate = useNavigate()
    const [partners, setPartners] = useState([])

    const { refetch } = useQuery({
        queryKey: ['fetchAllPartners'],
        queryFn: () => {
            return adminApi.getAllPartner()
        },
        onSuccess: (res) => {
            console.log(res.data)
            //console.log(res.data.content)
            setPartners(res.data.content)
        }
    })

    const handleUpdateStatus = useMutation({
        mutationFn: ({ id, status }) => {
            console.log(status)
            return adminApi.updatePartnerStatus(id, { status })
        },
        onSuccess: (res) => {
            console.log(res)
            refetch()
        },
        onError: (error) => {
            console.log(error)
            showErrorMessage('Some thing went wrong')
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
                        <div className='h2 mt-3 fw-bold text-uppercase'>Danh Sách Đối Tác</div>
                        <div className='row justify-content-center'>
                            <table className='table table-hover table-bordered text-center'>
                                <thead>
                                    <tr className='table-info  text-center'>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Tên Doanh Nghiệp</th>
                                        <th scope='col'>Tax Code</th>
                                        <th scope='col'>Website</th>
                                        <th scope='col'>Email</th>
                                        <th scope='col'>GPKD</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {partners.map((partner, index) => {
                                        const { status, website, email, partnerId, nameOfCompany, taxCode, businessLicense } = partner
                                        const licenseLink = `http://localhost:8080/api/v1/fileUpload/files/${businessLicense}`;
                                        return (
                                            <tr key={partnerId}>
                                                <th scope='row'>{index + 1}</th>
                                                <td>{nameOfCompany}</td>
                                                <td>{taxCode}</td>
                                                <td>{website}</td>
                                                <td>{email}</td>
                                                <td><a href={licenseLink} target="_blank">Link</a></td>
                                                <td>{status}</td>
                                                <td style={{ minWidth: 240 }}>
                                                    {status === 'pending' && (
                                                        <div className='d-flex'>
                                                            <button
                                                                onClick={() => {
                                                                    handleUpdateStatus.mutate({
                                                                        id: partnerId,
                                                                        status: 'success'
                                                                    })
                                                                }}
                                                                className='btn btn-primary'
                                                            >
                                                                Phê duyệt
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    handleUpdateStatus.mutate({
                                                                        id: partnerId,
                                                                        status: 'refused'
                                                                    })
                                                                }}
                                                                className='btn btn-danger'
                                                            >
                                                                Từ chối
                                                            </button>
                                                        </div>
                                                    )}
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
