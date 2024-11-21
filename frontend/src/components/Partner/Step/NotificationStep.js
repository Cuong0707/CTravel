import ActionButtons from '../ActionButtons'

const NotificationStep = ({ isLoading = true, isSuccess = true, onFinish = () => {} }) => {
    return (
        <div className='row d-flex ms-2 me-2'>
            {isSuccess && !isLoading && (
                <div className='thank-you-message'>
                    Cảm ơn bạn đã đăng ký trở thành đối tác của chúng tôi. Chúng tôi sẽ liên hệ đến bạn sớm nhất có thể
                </div>
            )}
            {isLoading && <div>...Vui lòng đợi trong khi chúng tôi xử lý dữ liệu.</div>}
            {isSuccess && !isLoading && (
                <div className='d-flex justify-content-end mb-2 mt-3'>
                    <ActionButtons onClick={onFinish} />
                </div>
            )}
            {!isSuccess && !isLoading && <div>Xảy ra lỗi trong quá trình xử lý.</div>}
        </div>
    )
}

export default NotificationStep
