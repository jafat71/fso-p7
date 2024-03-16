import axios from 'axios'
const baseUrl = 'http://localhost:8000/'

const getAll = async () => {
    const response = await axios.get(baseUrl + 'api/users')
    return response.data
}

const getOne = async (id) => {
    const response = await axios.get(baseUrl + 'api/users/'+id)
    return response.data
}

export default { getAll,getOne }