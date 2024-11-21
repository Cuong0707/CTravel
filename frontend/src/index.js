import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import Home from './components/Home'
import ContactUs from './components/ContactUs/ContactUs'

// import Login from './components/Login/Login';
import Login from './components/Login/SignIn'
import StepperForm from './components/Partner/StepperForm'
import SignUp from './components/Login/SignUp'
import ForgotPass from './components/ForgotPass/ForgotPass'
import ChangePass from './components/ChangePass/ChangePass'
import HotelList from './components/Hotel/HotelList'
import HotelDetail from './components/Hotel/HotelDetail'
import Blog from './components/Page404/Blog'
import Restaurant from './components/Page404/Restaurant'
import VistLocation from './components/Page404/VistLocation'
import Transport from './components/Page404/Transport'
import Search from './components/Search'
import ConfirmPassword from './components/ForgotPass/ConfirmPassword'

import MyAccount from './components/MyAccount/MyAccount'
import HistoryOrder from './components/MyAccount/HistoryOrder'
import Information from './components/MyAccount/Information'
import Message from './components/MyAccount/Message'

import AuthProvider from './context/auth-context'
import Booking from './components/Hotel/Booking'
import PayOrder from './components/Hotel/PayOrder'
import OrderDetail from './components/MyAccount/OrderDetail'

import ListUser from './components/admin/ListUser'
import ListPartner from './components/admin/ListPartner'
import ListOrder from './components/admin/ListOrder'
import LineChart from './components/admin/LineChart'
import InfoPartner from './components/PartnerManager/InfoPartner'
import OrderPending from './components/PartnerManager/OrderPending'
import ListOrder2 from './components/PartnerManager/ListOrder'
import LineChart2 from './components/PartnerManager/LineChart'
import HotelManager from './components/PartnerManager/HotelManager'

import { AdminRoute, PartnerRoute, ProtectedRoute, RejectedRoute } from './components/RouteWrapper/RouteWrapper'
import RoomManager from './components/PartnerManager/RoomManager'
import { ToastContainer } from 'react-toastify'

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false // default: true
        }
    }
})
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<App />}>
                            <Route path='/' element={<Home />}></Route>
                            <Route path='/contact' element={<ContactUs />}></Route>
                            <Route
                                path='/login'
                                element={
                                    <RejectedRoute>
                                        <Login />
                                    </RejectedRoute>
                                }
                            ></Route>
                            <Route
                                path='/register'
                                element={
                                    <RejectedRoute>
                                        <SignUp />
                                    </RejectedRoute>
                                }
                            ></Route>

                            <Route path='/HotelList' element={<HotelList />} />
                            <Route path='/HotelList/:id' element={<HotelDetail />} />
                            <Route
                                path='/order'
                                element={
                                    <ProtectedRoute>
                                        <Booking />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='/pay/:id'
                                element={
                                    <ProtectedRoute>
                                        <PayOrder />
                                    </ProtectedRoute>
                                }
                            ></Route>
                            <Route path='/blog' element={<Blog />} />
                            <Route path='/restaurant' element={<Restaurant />} />
                            <Route path='/vist-location' element={<VistLocation />} />
                            <Route path='/transport' element={<Transport />} />

                            <Route
                                path='/partner'
                                element={
                                    <ProtectedRoute>
                                        <StepperForm />
                                    </ProtectedRoute>
                                }
                            ></Route>
                            <Route path='/forgot-password' element={<ForgotPass />}></Route>
                            <Route path='/change-password' element={<ChangePass />}></Route>
                            <Route path='/search' element={<Search />}></Route>
                            <Route path='/reset-password' element={<ConfirmPassword />}></Route>
                        </Route>

                        <Route path='/my-account' exact element={<Information />}></Route>
                        <Route path='/order-history' exact element={<HistoryOrder />}></Route>
                        <Route path='/message' exact element={<Message />}></Route>

                        <Route path='/admin'>
                            <Route path='listuser' element={<ListUser />}></Route>
                            <Route path='listpartner' element={<ListPartner />}></Route>
                            <Route path='listorder' element={<ListOrder />}></Route>
                            <Route path='viewpage' element={<LineChart />}></Route>
                        </Route>

                        <Route path='/partner'>
                            <Route
                                path='info-partner'
                                element={
                                    <PartnerRoute>
                                        <InfoPartner />
                                    </PartnerRoute>
                                }
                            />
                            <Route
                                path='hotel-manager'
                                element={
                                    <PartnerRoute>
                                        <HotelManager />
                                    </PartnerRoute>
                                }
                            />
                            <Route
                                path='list-room'
                                element={
                                    <PartnerRoute>
                                        <RoomManager />
                                    </PartnerRoute>
                                }
                            />
                            <Route
                                path='order-pending'
                                element={
                                    <PartnerRoute>
                                        <OrderPending />
                                    </PartnerRoute>
                                }
                            />
                            <Route
                                path='list-order'
                                element={
                                    <PartnerRoute>
                                        <ListOrder2 />
                                    </PartnerRoute>
                                }
                            />
                            <Route
                                path='viewpage'
                                element={
                                    <PartnerRoute>
                                        <LineChart2 />
                                    </PartnerRoute>
                                }
                            />
                        </Route>
                        <Route path='*' element={<div> Not Found or You do not have permission.</div>} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
            <ToastContainer />
        </QueryClientProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
