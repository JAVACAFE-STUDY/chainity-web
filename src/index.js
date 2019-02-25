import React from 'react'
import {render} from 'react-dom'
import {HashRouter, Route, Switch, Redirect,} from 'react-router-dom'
import SignIn from './pages/getting-started/page-layout-examples/sign-in/SignIn'
import Checkout from './pages/getting-started/page-layout-examples/checkout/Checkout'
// import Blog from './pages/getting-started/page-layout-examples/blog/Blog'
import Dashboard from './pages/getting-started/page-layout-examples/dashboard/Dashboard'
import Pricing from './pages/getting-started/page-layout-examples/pricing/Pricing'

//window.React = React;

render(
    <HashRouter>
        <div className="main">
            <Switch>
                <Route exact path="/" component={SignIn}/>
                <Route path="/signin" component={SignIn}/>
                <Route path="/checkout" component={Checkout}/>
                {/*<Route path="/blog" component={Blog} />*/}
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/pricing" component={Pricing}/>
            </Switch>
        </div>
    </HashRouter>,
    document.getElementById("react-container")
);