import React, { Component } from 'react';
import Products from '../Components/Products';
import Filter from '../Components/filter';
import Cart from '../Components/Cart';

export default class homeScreen extends Component {
    render() {
        return (
            <div>
                <div className="content" >
                    <div className="products">
                        <Filter />
                        <Products />
                    </div>
                    <div className="sidebar">
                        <Cart />
                    </div>
                </div>
            </div>
        )
    }
}
