import service from './service'

export const fetchLogin = params => service.post('login', params)
