import React, { useState, useEffect, useContext } from 'react'
import { Box, Modal } from '@mui/material'
import Dashboard from './Dashboard'
import Toolbar from '@mui/material/Toolbar'
import { AuthContext } from '../../context/auth-context'
import { stat } from 'fs'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ModalRoomManager from './Modal/ModalRoomManager'
import AddressForm from '.././Address/AddressForm'

const drawerWidth = 240
export default function HotelManager() {
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
                        <div className='h2 mt-3 fw-bold text-uppercase'>Quản lý khách sạn</div>
                    </Box>
                </Box>
            </div>
        </div>
    )
}
