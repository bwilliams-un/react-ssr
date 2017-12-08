import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ route }) => (
    <div>
        <h2>Home</h2>
        <ul>
            <li><Link to="/item/12345">Item 12345</Link></li>
            <li><Link to="/item/67890">Item 67890</Link></li>
        </ul>
    </div>
);

export default Home;