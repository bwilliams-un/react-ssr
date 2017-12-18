import React from 'react';
import PropTypes from 'prop-types';
import ItemTile from './ItemTile';

const ItemList = ({isLoading, items}) => (
    <div>
        {
            (isLoading) ?
                <span>Items Loading...</span> :
                items.map(item => {
                    return <ItemTile key={item.id} item={item}/>;
                })
        }
    </div>
);

ItemList.propTypes = {
    isLoading: PropTypes.bool,
    items: PropTypes.array
};

export default ItemList;
