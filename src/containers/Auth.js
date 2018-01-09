import React from 'react';
import {connect} from 'react-redux';
import Login from './Login/Login';

/**
 * This is a Higher-Order Component it returns a component
 * Usage: withAuthentication(Component)
 *
 * This is not a provider, it does not pass authentication props to children
 */

export const withAuthentication = (ProtectedComponent) => {
    const displayName = ProtectedComponent.displayName || ProtectedComponent.name || 'Component';

    class AuthWrapper extends React.Component {
        static displayName = `withAuthentication(${displayName})`;

        render() {
            const { isAuthenticated, ...otherProps } = this.props;

            if (isAuthenticated) {
                return <ProtectedComponent {...otherProps}/>;
            } else {
                return <Login {...otherProps}/>;
            }
        }
    }

    const mapStateToProps = state => ({
        isAuthenticated: state.auth.isAuthenticated
    });

    return connect(mapStateToProps)(AuthWrapper);
};

