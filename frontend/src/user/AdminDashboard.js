import React from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from "../auth";
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
    const {
        user: { name, email, role }
    } = isAuthenticated();

    const adminLink = () => {
        return (
            <div className="card">
                <h4 className="card-header">admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">
                            create category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to='/create/product/'>
                            create product
                        </Link>
                    </li>

                </ul>
            </div>
        );
    };

    return (
        <div>
            <Layout title="dashboard" description="description ">

                <h3 className="card-header">admin Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                    <li>
                        {adminLink()}
                    </li>
                </ul>

            </Layout>
        </div>
    )
}

export default AdminDashboard
