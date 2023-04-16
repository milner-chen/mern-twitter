import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Component } from 'react';

export const AuthRoute = ({component: Component, path, exact }) => {
    // if a user is present in the state
    const loggedIn = useSelector(state => !!state.session.user);
    return (
        <Route path={path} exact={exact} render={(props) => (
            !loggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect to="/tweets" />
            )
        )} />
    );
};

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const loggedIn = useSelector(state => !!state.session.user);

    return (
        <Route 
        {...rest}
        render={prop => loggedIn ? (
            <Component {...props} />
        ) : (
            <Redirect to="/login" />
        )} />
    );
};

