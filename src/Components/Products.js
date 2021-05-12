import React, { Component } from 'react'
import formatCurrency from './../util'
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'
import {connect} from 'react-redux'
import {fetchProducts} from '../Actions/productActions'
//import Flip from 'react-reveal/Flip';

 class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product:null,
        }
    }
    componentDidMount() {
        this.props.fetchProducts()
    }
    openModal=(product)=> {
        this.setState({product:product}) //fill the state product with the selected product
        console.log(this.state.product)
        
    }
    closeModal=()=>{
       this.setState({product:null})
       
    }
    render() {
    // const modProduct = this.state.modProduct;
        return (
            <div>
                <Fade bottom cascade={true}>
                <ul className="product-list">
                   {this.props.Products.map((product) =>(
                       <li key={product._id}>
                           <div className="product">
                            <a href={"#" + product._id} onClick={()=>this.openModal(product)}>
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
                </Fade> 
                 
              {this.state.product &&(
                    <Modal className="Modal Overlay" isOpen={true} onRequestClose={() => this.closeModal()}>
                    <Zoom >
                        <button className="close-modal" onClick={()=>this.closeModal()}>X</button>
                        <div className="product-details">
                            {this.state.product &&(
                            <div className="product-details">
                                <div>
                                    <img src={this.state.product.image} alt={this.state.product.title}></img>
                                    <p><strong>{this.state.product.title}</strong></p>
                                </div>
                                
                                <div className="product-details-desc">
                                    
                                    <div>{this.state.product.description}</div>
                                    <div className="product-sizes">
                                        <p>Available sizes:{" "}
                                            {this.state.product.availableSizes.map(size =>(
                                                <span>{" "}<button className="button">{size}</button></span>
                                            ))}
                                        </p>
                                    </div>
                                    <div className="modal-price">
                                    <div>Price: {formatCurrency(this.state.product.price)}</div>
                                    <button className="button primary" onClick={()=>{
                                        this.closeModal();
                                        this.props.addToCart(this.state.product)}}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                    </Zoom>
                </Modal>
              )}
                      
            </div>
        )
    }
}
//we set an items field in the reducer , so use products.items to retrieve the product
export default connect((state)=>({products:state.products.items}),{fetchProducts})(Products)