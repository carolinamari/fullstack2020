import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseURL).then(response => response.data)
}

const create = newObject => {
  return axios.post(baseURL, newObject).then(response => response.data)
}

const deleteObject = id => {
  return axios.delete(`${baseURL}/${id}`)
}

export default { getAll, create, deleteObject }