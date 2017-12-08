import React from 'react';
import { renderRoutes } from 'react-router-config';

import './Root.css'; // eslint-disable-line no-unused-vars

class Root extends React.Component {
    render() {
        return (
            <div className="root-container">
                <h1>This is a Root Container</h1>
                {renderRoutes(this.props.route.routes)}
            </div>
        );
    }
}

export default Root;