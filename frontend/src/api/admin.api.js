import http from '../utils/http'

const getAllPartner =  () => {
    return http.get('/admins/partners')
}

const getAllUser = () => {
    return http.get('/admins/users')
}

const getAllOrders = () => {
    return http.get('/admins/orders')
}

const updatePartnerStatus = (id, body) => {
    return http.put('/admins/partners/' + id, body)
}

const updateUserActiveStatus = (id) => {
    return http.put('/admins/users/' + id)
}

const adminApi = { getAllPartner, getAllUser, getAllOrders, updatePartnerStatus, updateUserActiveStatus }

export default adminApi
