import React from 'react'
import {render} from 'react-dom'
import {HashRouter, Route, Switch, Redirect,} from 'react-router-dom'

//window.React = React;
const router = (
    <HashRouter>
        <div className="main">
            <Switch>
                {/*<Route exact path="/" component={SignIn}/>
                <Route exact path="/sample" component={SignIn}>
                    <Route path="/signin" component={SignIn}/>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/blog" component={Blog} />
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/pricing" component={Pricing}/>
                </Route>*/}
            </Switch>
        </div>
    </HashRouter>
);

export default router;