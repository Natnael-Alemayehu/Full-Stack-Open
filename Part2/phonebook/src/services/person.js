import axios from "axios";

const BASEURL = 'http://localhost:3001/persons'

const getPerson = () => {
    const request = axios.get(BASEURL)
    return request.then(response => response.data)
}

const addPerson = (personObject) => {
    const request = axios.post(BASEURL, personObject)
    return request.then(response => response.data)
}

export default { getPerson, addPerson }