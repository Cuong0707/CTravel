import http from '../utils/http'

const createPartner = (formData) => {
    return http.post('/partners/all', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const getOnePartner = (id) => {
    return http.get('/partners/' + id)
}

const getOrderByPartner = () => {
    return http.get('/orders/partners')
}

const filterOrder = () => {
    return http.get('/orders/partners/filter/all', { params: { status: 'pending' } })
}

const updateStatus = (id, status) => {
    return http.put('/orders/' + id + '/partners', { status })
}

const getAllHotel = (partnerId) => {
    return http.get('/hotels/partners/' + partnerId)
}

const partnerApi = { createPartner, getAllHotel, getOnePartner, getOrderByPartner, filterOrder, updateStatus }

export default partnerApi
