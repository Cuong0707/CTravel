import { Button } from "react-bootstrap";

export default function ActionButtons({ name = "Next", onClick = () => { }, isLoading = false }) {
    return <Button onClick={onClick} className="btn btn-success">{isLoading ? '...Loading' : name}</Button>
};