import { api } from '../config'
import axios from 'axios'


export const signup = (user) => {
    return axios.post(`${api}/signup`, user).then(res => {
        console.log(res.data);
        return res.data


    }).catch(err => {
        return err.response.data

    })
}


export const signin = (user) => {
    return axios.post(`${api}/signin`, user).then(res => {
        console.log(res);

        return res.data


    }).catch(err => {
        return err.response.data

    })
}

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem("key", JSON.stringify(data))
        next()
    }

}

export const signout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem("key")
        // next()
        next.push('/')
        return axios.get(`${api}/signout`)
            .then(res => {
                console.log("logout", res);
            }).catch(err => {
                console.log(err);
            })
    }
}

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false
    }
    else if (localStorage.getItem('key')) {
        return JSON.parse(localStorage.getItem('key'))
    }
    else return false
}