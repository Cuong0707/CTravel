import http from '../utils/http'

const checkOut = (body) => {
    return http.post('/orders', body)
}

const getOrderByUser = (queryConfig) => {
    return http.get('/orders/users', { params: queryConfig })
}

const filterOrder = (params) => {
    return http.get('/orders/users/filter/all', { params: params })
}

const getById = (id) => {
    return http.get('/orders/' + id)
}

const cancelledOrder = (id) => {
    return http.put('/orders/' + id + '/users', { status: 'canceled' })
}

const orderApi = { checkOut, getOrderByUser, filterOrder, getById, cancelledOrder }

export default orderApi
