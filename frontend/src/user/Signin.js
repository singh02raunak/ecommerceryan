import React, { useState } from 'react'
import Layout from '../core/Layout'

import { Redirect } from 'react-router-dom'
import { authenticate, isAuthenticated, signin } from '../auth'

export default function Signup() {

    const [values, setValues] = useState({
        email: 'raunak@gmail.com',
        password: '123456789',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const { error, email, password, loading, redirectToReferrer } = values
    const { user } = isAuthenticated();
    const handleChange = (e) => {
        setValues({ ...values, error: false, [e.target.name]: e.target.value })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, loading: true })
        signin(values).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false })
            }
            else {
                authenticate(data, () => {
                    setValues({ ...values, loading: false, redirectToReferrer: true })

                })
                //    setValues({...values,loading:false,redirectToReferrer:true})
            }
        })
    }
    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }

        }
        if (isAuthenticated()) {
            return <Redirect to='/' />
        }
    }


    const signUpForm = () => (
        <form>


            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange} type="email" name="email" className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange} type="password" name="password" className="form-control" value={password} />
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );


    return (
        <div>
            <Layout title="signup" description="description " className="container">
                {showLoading()}
                {showError()}
                {signUpForm()}
                {redirectUser()}

            </Layout>
        </div>
    )
}
