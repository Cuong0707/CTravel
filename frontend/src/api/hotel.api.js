import http from "../utils/http";

const filterHotel = async (params) => {
    return http.get("/hotels", { params: params })
}

const getHotelById = async (id) => {
    return http.get("/hotels/" + id)

}

const hotelApi = { filterHotel, getHotelById }

export default hotelApi