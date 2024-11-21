import http from '../utils/http'

const login = async function (body) {
    return http.post('/auth/login', body)
}

const register = async function (body) {
    return http.post('/auth/register', body)
}

const updateInformation = async (body) => {
    return await http.put('/users', body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const authApi = { login, register, updateInformation }
export default authApi
