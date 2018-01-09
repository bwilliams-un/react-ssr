import React from 'react';
import { connect } from 'react-redux';
import ItemList from '../../components/Items/ItemList';
import { fetchItems } from '../../state/modules/items';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    componentDidMount() {
        if (this.props.items.length === 0) {
            this.props.fetchItems();
        }
    }

    render() {
        const { isLoading, items } = this.props;
        return (
            <div>
                <h2>Home</h2>
                <ItemList isLoading={isLoading} items={items}/>
                <p><Link to="/user">User</Link></p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.items.isLoading,
    items: state.items.list
});

const mapDispatchToProps = dispatch => ({
    fetchItems: () => dispatch(fetchItems())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);