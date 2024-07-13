import axios from "axios";

const BASEURL = '/api/persons'

const getPerson = () => {
    const request = axios.get(BASEURL)
    return request.then(response => response.data)
}

const addPerson = (personObject) => {
    const request = axios.post(BASEURL, personObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${BASEURL}/${id}`)
    return request.then(response => response.data)
}

const updatePerson = (id, newData) => {
    const request = axios.put(`${BASEURL}/${id}`, newData)
    return request.then(response => response.data)
}

export default { getPerson, addPerson, deletePerson, updatePerson }