import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// export const HotelContext = createContext();

// const LoadListHotel = ({ children }) => {

//     const searchById = async (id) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/api/v1/hotels/provinces/${id}`);
//             console.log("thành công :"+ response.data);
//             return response.data.data;
//         } catch (error) {
//             console.error('Error fetching hotel by province id:', error);
//             return [];
//         }
//     };

//     return (
//         <HotelContext.Provider value={{ searchById }}>
//             {children}
//         </HotelContext.Provider>
//     );
// };

// export default LoadListHotel;


const LoadListHotel = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/hotels/provinces/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching hotel list:', error);
        return [];
    }
};
export { LoadListHotel };