import React from 'react';
import { Link } from 'react-router-dom';

class ItemDetail extends React.Component {
    render() {
        return (
            <div>
                <h2>Item Detail</h2>
                <p>Item Number: {this.props.match.params.id}</p>
                <Link to="/">Back to Home</Link>
            </div>
        );
    }
}

export default ItemDetail;