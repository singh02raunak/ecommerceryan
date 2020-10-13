import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth'
import Layout from '../core/Layout'
import { createProduct, getCategory } from './apiAdmin';

const AddProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;


    const { user, token } = isAuthenticated()

    const handleChange = event => {
        const value = event.target.name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set([event.target.name],value)
        setValues({ ...values, [event.target.name]: value });
    };

    const init=()=>{
        getCategory().then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values,categories:data,formData: new FormData()})
            }
        })
    }

    useEffect(() => {
        init()
    }, [])

    const clickSubmit = (e) => { 
        e.preventDefault()
        console.log(values);
        getCategory()
        setValues({ ...values, error: '', loading: true })
        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                }
                else {
                    setValues({
                        ...values, name: '', description: '', quantity: '',
                        createdProduct: data.name,
                        photo: '', loading: false,
                    })
                }
            })

    }

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange} type="text" className="form-control" value={name} name="name" />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange} className="form-control" value={description} name="description" />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange} type="number" className="form-control" value={price} name="price" />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange} className="form-control" name='category'>
                <option>Please select</option>
                    {categories &&
                        categories.map((c,i)=>{
                       return <option key={i} value={c._id}>{c.name}</option>
                        })
                    }
                    {/* <option>Please select</option>
                    <option value="5f858f56ee18141a5064d5c0">1</option>
                    <option value="5f858f56ee18141a5064d5c0">2</option> */}


                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange} className="form-control" name='shipping'>
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange} type="number" className="form-control" value={quantity} name="quantity" />
            </div>

            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout
            title="Add a new product"
            description={`G'day ${user.name}, ready to add a new product?`}
        >

            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    )
}

export default AddProduct
