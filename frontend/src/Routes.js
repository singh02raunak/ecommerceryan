import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'
import Home from './core/Home'
import Menu from './core/Menu'
import AdminDashboard from './user/AdminDashboard'
import AdminRoute from './auth/AdminRoute'
import Signin from './user/Signin'
import Signup from './user/Signup'
import UserDashboard from './user/UserDashboard'


export default function Routes() {
    return (
        <BrowserRouter>
            <Menu />

            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
                <PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
                <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />


            </Switch>
        </BrowserRouter>
    )
}
