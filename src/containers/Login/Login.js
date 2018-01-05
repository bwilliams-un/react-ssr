import React from 'react';
import {connect} from 'react-redux';
import {authenticateUser} from '../../state/modules/auth';

class Login extends React.Component {
    errorMessage = () => {
        if (this.props.error) {
            return (
                <div>
                    {this.props.error}
                </div>
            );
        }
    };

    handleSubmit = event =>{
        event.preventDefault();
        this.props.authenticate(this.userNode.value, this.passNode.value);
    };

    render() {
        const { errorMessage, handleSubmit } = this;
        const { isAuthenticated, isLoading, username } = this.props;
        let content;
        if (isAuthenticated) {
            content = (
                <span>Logged in as {username}</span>
            );
        } else if (isLoading) {
            content = (
                <span>Authenticating...</span>
            );
        } else {
            content = (
                <form onSubmit={handleSubmit}>
                    <input name="username" ref={node => (this.userNode = node)} type="text"/>
                    <input name="password" ref={node => (this.passNode = node)} type="text"/>
                    <button type="submit">Login</button>
                </form>
            );
        }
        return (
            <div>
                <h1>Login</h1>
                {content}
                {errorMessage()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    username: state.auth.username,
    error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
    authenticate: (username, password) => dispatch(authenticateUser(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);