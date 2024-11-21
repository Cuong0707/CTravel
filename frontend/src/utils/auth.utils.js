export const LocalStorageEventTarget = new EventTarget()

export const getAccessTokenFromLS = () => {
    return localStorage.getItem('access_token') || ''
}
export const setAccessTokenToLS = (access_token) => {
    localStorage.setItem('access_token', access_token)
}
export const clearLS = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('profile')
    const clearLSEvent = new Event('clearLS')
    LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getProfileFromLS = () => {
    let result = localStorage.getItem('profile')
    if (result === 'undefined') {
        result = ''
    }
    return result ? JSON.parse(result) : null
}

export const setProfileToLS = (profile) => {

    localStorage.setItem('profile', JSON.stringify(profile))
}