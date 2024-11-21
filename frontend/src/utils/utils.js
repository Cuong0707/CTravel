import { toast } from 'react-toastify'
export function convertToBlob(obj) {
    const json = JSON.stringify(obj)
    return new Blob([json], {
        type: 'application/json'
    })
}

export function generateImageFromFileName(fileName = '') {
    if (!fileName) {
        return ''
    }
    if (fileName.startsWith('http') || fileName.startsWith('https')) {
        return fileName
    }
    return `http://localhost:8080/api/v1/fileUpload/files/${fileName}`
}

export function formatCurrency(currency, prefix = 'VNĐ') {
    return new Intl.NumberFormat('de-DE').format(Math.round(currency)) + prefix
}

export function getHotelDetailStandard(type) {
    switch (type) {
        case 'standard':
            return 'Phòng Tiêu Chuẩn'
        case 'vip':
            return 'Phòng Vip'
        default:
            return type
    }
}

export function formatDate(date = new Date()) {
    let datePart = []
    if (typeof date == 'string') {
        datePart = date.split('-')
    } else {
        datePart = date.toISOString().substring(0, 10).split('-')
    }
    console.log(datePart)
    console.log(`${datePart[2]}/${datePart[1]}/${datePart[0]}`)
    return `${datePart[1]}/${datePart[2]}/${datePart[0]}`
}

export function getCheckInCheckOutTime(strTime) {
    var date = new Date()
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Month is zero-based
    const day = date.getDate().toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${month}/${day}/${year} ${strTime}`
}

export function showSuccessMessage(message = '', options = {}) {
    toast.success(message || 'Cập Nhật Thành Công', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        theme: 'light',
        ...options
    })
}

export function showErrorMessage(message = '', options = {}) {
    toast.error(message || 'Cập Nhật Thành Công', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        theme: 'light',
        ...options
    })
}
