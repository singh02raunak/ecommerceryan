import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: 'red' }
    }
    else {
        return { color: 'white' }
    }
}


const Menu = ({ history }) => {

    return <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, '/')}
                    to="/"
                >
                    Home
                </Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, '/user/dashboard')}
                        to="/user/dashboard"
                    >
                        Dashboard
                 </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, '/admin/dashboard')}
                        to="/admin/dashboard"
                    >
                        Dashboard
                 </Link>
                </li>
            )}

            {!isAuthenticated() && (
                <>  <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, '/signin')}

                        to="/signin"
                    >
                        signin
                </Link>
                </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, '/signup')}

                            to="/signup"
                        >
                            signup
                </Link>
                    </li>
                </>
            )

            }
            {isAuthenticated() && (
                <li className="nav-item">
                    <span
                        // onClick={() => {
                        //     signout(() => {
                        //         history.push('/signin')
                        //     })
                        // }}
                        onClick={() => { signout(history) }}
                        className="nav-link"
                        style={{ color: 'white' }}

                    >
                        signout
 </span>
                </li>
            )}

        </ul></div>
}

export default withRouter(Menu);