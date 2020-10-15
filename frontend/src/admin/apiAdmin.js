import Axios from 'axios';
import { api } from '../config';

export const createCategory = (userId, token, category) => {
    // return fetch(`${api}/category/create/${userId}`, {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${token}`
    //     },
    //     body: JSON.stringify(category)
    // })
    //     .then(response => {
    //         console.log(response);
    //         console.log(123);
    //         return response.json();
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'sometoken',
            Authorization: `Bearer ${token}`

        }
    }

    return Axios.post(`${api}/category/create/${userId}`, category, config
    )
        .then(res => {
            console.log(res)
            console.log(userId);
            return res.data
        }).catch(err => {
            return err.response.data
        })
};



// export const createProduct = (userId, token, product) => {

//     const config = {
//         headers: {
//             Accept: 'application/json',

//             Authorization: `Bearer ${token}`

//         }
//     }

//     return Axios.post(`${api}/product/create/${userId}`, product, config
//     )
//         .then(res => {
//             console.log(product);
//             return res.data
//         }).catch(err => {
//             return err.response.data
//         })
// };
export const createProduct = (userId, token, product) => {
    return fetch(`${api}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });

    //     const config = {
    //         headers: {
    //             Accept: 'application/json',
    //         Authorization: `Bearer ${token}`
    
    //         }
    //     }
    //  return   Axios.post(`${api}/product/create/${userId}`,product,config)
    //     .then(res=>{
    //         console.log(res);
    //         return res.data
    //     }).catch(err=>{
    //         console.log(err)
    //         return err.response.data
    //     })
};


export const getCategory=()=>{
    return Axios.get(`${api}/categories`).then(res=>{
        console.log(res)
        return res.data
    }).catch(err=>{
        console.log(err)
        return err.response.data
    })
}