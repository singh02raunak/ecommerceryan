import { api } from '../config'
import Axios from 'axios'


export const getProducts = (sortBy) => {
    return Axios.get(`${api}/products?sortBy=${sortBy}&order=desc&limit=6`).then(res => {
        console.log(res.data)
        return res.data
    }).catch(err => {
        console.log(err)
        return err.response.data
    })
}