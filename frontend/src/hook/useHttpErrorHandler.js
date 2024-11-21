import { useNavigate } from "react-router-dom";
import { clearLS } from "../utils/auth.utils";
import useAppContext from "./useAppContext";

function useHttpErrorHandler() {
    const navigate = useNavigate();
    const { reset } = useAppContext()
    const handleError = (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                reset();
                navigate("/login");
                clearLS();
            } else if (error.response.status === 403) {
                reset();
                navigate("/login");
                clearLS();
            } else {
                return error.response;
            }
        }
    }
    return { handleError }
}

export default useHttpErrorHandler;