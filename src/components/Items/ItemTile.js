import React from 'react';
import PropTypes from 'prop-types';

const ItemTile = ({ item }) => (
    <div>
        <p>Item Id: {item.id}</p>
        <p>Item Name: {item.name}</p>
    </div>
);

ItemTile.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })
};

export default ItemTile;