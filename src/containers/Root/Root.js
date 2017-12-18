import React from 'react';
import { renderRoutes } from 'react-router-config';

import './Root.css'; // eslint-disable-line no-unused-vars

class Root extends React.Component {
    render() {
        return (
            <div className="root-container">
                {renderRoutes(this.props.route.routes)}
            </div>
        );
    }
}

export default Root;