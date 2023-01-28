import http from '../tools/http'
const getData = () => {
    return http.get('/home/getData')
}
const getUser = (params) => {
    return http.get('/user/getUser', params)
}
const deleteU = (data) => {
    return http.post('/user/delete', data)
}
const updateU = (data) => {
    return http.post('/user/update', data)
}
const createU = (data) => {
    return http.post('/user/create', data)
}

export { getData, getUser, deleteU, updateU, createU }