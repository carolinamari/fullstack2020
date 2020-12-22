import axios from 'axios'
const baseURL = '/api/persons'

const getAll = () => {
  return axios.get(baseURL).then(response => response.data)
}

const create = newObject => {
  return axios.post(baseURL, newObject).then(response => response.data)
}

const deleteObject = id => {
  return axios.delete(`${baseURL}/${id}`)
}

const update = (id, newObject) => {
  return axios.put(`${baseURL}/${id}`, newObject).then(response => response.data)
}

const phonebookService = { getAll, create, deleteObject, update }

export default phonebookService