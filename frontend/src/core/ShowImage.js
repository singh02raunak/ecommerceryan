import React from 'react'
import { api } from '../config'


const ShowImage = ({ item, url }) => {
    console.log(item);
    return <div className="product-img">
        <img
            src={`${api}/${url}/photo/${item._id}`}
            alt={item.name}
            className="mb-3"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
    </div>
}

export default ShowImage;