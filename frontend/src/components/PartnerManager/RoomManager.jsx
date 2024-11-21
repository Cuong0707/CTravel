import React, { useState, useEffect, useContext } from 'react'
import { Box, Modal } from '@mui/material'
import Dashboard from './Dashboard'
import Toolbar from '@mui/material/Toolbar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ModalRoomManager from './Modal/ModalRoomManager'
import useAppContext from '../../hook/useAppContext'
import { useQuery } from 'react-query'
import partnerApi from '../../api/partner.api'

const drawerWidth = 240
export default function ListUser() {
    const { profile } = useAppContext()
    const partnerId = profile.partnersDto.partnerId

    const { data } = useQuery({
        queryKey: ['getAllHotelByPartner'],
        queryFn: () => {
            return partnerApi.getAllHotel(partnerId)
        },
        onSuccess: (res) => {}
    })
    console.log(data)
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
                        <div className='h2 mt-3 fw-bold text-uppercase'>Quản lý phòng</div>
                        <div className='row justify-content-center'>
                            <table className='table table-hover table-bordered text-center'>
                                <thead>
                                    <tr className='table-info  text-center'>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Loại phòng</th>
                                        <th scope='col'>Kích thước phòng</th>
                                        <th scope='col'>Số lượng phòng</th>
                                        <th scope='col'>Kiểu giường</th>
                                        <th scope='col'>Kích thước giường</th>
                                        <th scope='col'>Giá phòng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.data?.hotelDetails.map((hotel, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope='row'>{index + 1}</th>
                                                <td>{hotel.typeOfRoom}</td>
                                                <td>{hotel.areaOfRoom}</td>
                                                <td>{hotel.amountOfRoom}</td>
                                                <td>{hotel.typeOfBed}</td>
                                                <td>{hotel.sizeOfBed}</td>
                                                <td>{hotel.priceOfRoom}</td>
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
