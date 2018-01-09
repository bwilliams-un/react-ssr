import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const User = ({ username, token }) => (
    <div>
        <h2>Profile</h2>
        <p>Protected page</p>
        <div style={{width: 400, wordWrap: 'break-word'}}>
            <p>Username: {username}</p>
            <p>Token: {token}</p>
        </div>
        <Link to="/">Home</Link>
    </div>
);

const mapStateToProps = state => ({
    username: state.auth.username,
    token: state.auth.token
});

export default connect(mapStateToProps)(User);