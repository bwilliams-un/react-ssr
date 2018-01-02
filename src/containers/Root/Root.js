import React, { Fragment } from 'react';
import { renderRoutes } from 'react-router-config';

import './Root.css'; // eslint-disable-line no-unused-vars

// Use Fragment instead of adding another root div which is unnecessary
class Root extends React.Component {
    render() {
        return (
            <Fragment>
                {renderRoutes(this.props.route.routes)}
            </Fragment>
        );
    }
}

export default Root;