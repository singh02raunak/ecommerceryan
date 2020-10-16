import React, { useEffect, useState } from 'react'
import { getProducts } from './apiCore';
import Card from './Card';
import Layout from './Layout'

export default function Home() {
    const [productBySell, setproductBySell] = useState([])
    const [productByArrival, setproductByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadproductbysell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setproductBySell(data)
            }
        })
    }

    const loadproductbyarrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setproductByArrival(data)
            }
        })
    }

    useEffect(() => {
        loadproductbyarrival()
        loadproductbysell()

    }, [])

    return (
        <Layout title="home" description="description " className="container-fluid">
            <h2 className="mb-4">New Arrival</h2>
            <div className="row">
                {/* {JSON.stringify(productBySell)} */}
                {productBySell.map((product, i) => {
                    return <Card key={i} product={product} />
                })}
            </div>
            <hr />
            <h2 className="mb-4">New Arrival</h2>
            <div className="row">
                {productByArrival.map((product, i) => {
                    return <Card key={i} product={product} />
                })}
                {/* {JSON.stringify(productByArrival)} */}
            </div>
        </Layout>
    )
}
