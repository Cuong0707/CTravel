import React, { useState, useEffect, useContext } from 'react'
import { Box, Modal } from '@mui/material'
import Dashboard from './Dashboard'
import Toolbar from '@mui/material/Toolbar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useAppContext from '../../hook/useAppContext'
import { generateImageFromFileName } from '../../utils/utils'

const drawerWidth = 240
export default function ListUser() {
    const { profile } = useAppContext()
    const partner = profile.partnersDto
    return (
        <div>
            <div className='container mt-4'>
                <ToastContainer />
                <Box sx={{ display: 'flex' }}>
                    <Dashboard />
                    <Box
                        component='main'
                        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, marginTop: '30px' }}
                    >
                        <Toolbar />
                        <div className='container mt-4'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <div className='ms-5'>
                                        <input
                                            type='file'
                                            accept='image/*'
                                            style={{ display: 'none' }}
                                            id='fileInput'
                                        />
                                        <label htmlFor='fileInput'>
                                            <img
                                                src={generateImageFromFileName(partner.avatar)}
                                                className='rounded-circle'
                                                style={{ width: '150px', cursor: 'pointer' }}
                                                alt='Avatar'
                                                title='Click to choose file'
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className='col-md-9'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <form onSubmit={''}>
                                                <div className='row'>
                                                    <div className='mb-3 col-md-6'>
                                                        <label htmlFor='nameCompany' className='form-label'>
                                                            Tên doanh nghiệp
                                                        </label>
                                                        <input
                                                            type='text'
                                                            id='fullname'
                                                            name='fullname'
                                                            className='form-control'
                                                            required
                                                            value={partner?.nameOfCompany}
                                                        />
                                                    </div>
                                                    <div className='mb-3 col-md-6'>
                                                        <label htmlFor='email' className='form-label'>
                                                            Email
                                                        </label>
                                                        <input
                                                            type='email'
                                                            id='email'
                                                            name='email'
                                                            className='form-control'
                                                            required
                                                            value={partner?.email}
                                                        />
                                                    </div>
                                                    <div className='mb-3 col-md-6'>
                                                        <label htmlFor='address' className='form-label'>
                                                            Địa chỉ
                                                        </label>
                                                        <input
                                                            type='text'
                                                            id='address'
                                                            name='address'
                                                            className='form-control'
                                                            required
                                                            value={profile?.address}
                                                        />
                                                    </div>
                                                    <div className='mb-3 col-md-6'>
                                                        <label htmlFor='taxCode' className='form-label'>
                                                            Tax code
                                                        </label>
                                                        <input
                                                            disabled
                                                            type='number'
                                                            id='number'
                                                            name='number'
                                                            className='form-control'
                                                            required
                                                            value={partner?.taxCode}
                                                        />
                                                    </div>
                                                    <div className='mb-3 col-md-6'>
                                                        <label htmlFor='phone_number' className='form-label'>
                                                            Số điện thoại
                                                        </label>
                                                        <input
                                                            type='number'
                                                            id='phone_number'
                                                            name='phone_number'
                                                            className='form-control'
                                                            required
                                                            value={profile?.phone_number}
                                                        />
                                                    </div>
                                                    <div className='mb-3 col-md-6'>
                                                        <label htmlFor='website' className='form-label'>
                                                            Website
                                                        </label>
                                                        <input
                                                            type='text'
                                                            id='website'
                                                            name='website'
                                                            className='form-control'
                                                            required
                                                            value={partner?.website}
                                                        />
                                                    </div>
                                                </div>
                                                {/* <button className='btn btn-primary float-end' type='submit'>
                                                    Cập nhật
                                                </button> */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Box>
            </div>
        </div>
    )
}
