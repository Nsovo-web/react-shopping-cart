import React, { Component } from 'react'

export default class Cart extends Component {
    render() {
        
            //const {cartItems} = this.props.cartItems;
         //from the parent component get the cartItems passed as properties
        return (
            <div>
                {this.props.cartItems.length === 0?
                <div className="cart cart-header">The Cart Is Empty</div>
                :
                <div className="cart cart-header">You Have {this.props.cartItems.length} Item(s) In The Cart</div>
                }
                
            </div>
        )
    }
}
