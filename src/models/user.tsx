import { axiosGet } from '../util/callApi'

export const getUsers = async () => {
    return axiosGet('/api/users/110/fetch', { name: 'xxx' })
}
