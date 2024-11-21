import http from "../utils/http";

const getALlProvince = async () => {
    return http.get("/provinces")
}

const getDistrictByProvince = async (provinceId) => {
    return http.get("/districts/" + provinceId)
}

const addressApi = { getALlProvince, getDistrictByProvince }

export default addressApi