import React, { Component } from 'react'
import formatCurrency from './../util'


export default class Products extends Component {
    render() {
        return (
            <div>
                <ul className="product-list">
                   {this.props.Products.map((product) =>(
                       <li key={product._id}>
                           <div className="product">
                            <a href={"#" + product._id}>
                                <img src={product.image} alt={product.title}></img>
                                <h3>{product.title}</h3>
                            </a>
                            <div className="product-price">
                               <div className="price">{formatCurrency(product.price)}</div>
                               
                               <button onClick={()=>this.props.addToCart(product)} className="button primary">Add To Cart</button>
                            </div>
                           </div>
                       </li>
                    ))}
                </ul>
            </div>
        )
    }
}
