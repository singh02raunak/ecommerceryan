import React, { useState } from 'react'
import Layout from '../core/Layout'

import { Link } from 'react-router-dom'
import { signup } from '../auth'

export default function Signup() {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })


    const { name, error, email, password, success } = values
    const handleChange = (e) => {
        setValues({ ...values, error: false, [e.target.name]: e.target.value })

    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        signup(values).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            }
            else {
                console.log(values);
                setValues({ ...values, success: true, error: '', name: '', email: '', password: '' })
            }
        })

    }



    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange} type="text" name="name" className="form-control" value={name} />
            </div>

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

    const showSuccess = () => {
        return <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    }
    // if(success){
    //   return   <Redirect to='/signin'/>
    // }

    return (
        <div>
            <Layout title="signup" description="description " className="container">

                {showError()}
                {showSuccess()}
                {signUpForm()}
                {error && <div>{error}</div>}
            </Layout>
        </div>
    )
}




