import axios from 'axios';

const LoadListProvince = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/provinces');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching hotel list:', error);
        return [];
    }
};
export { LoadListProvince };