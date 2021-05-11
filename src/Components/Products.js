import React, { Component } from 'react'
import formatCurrency from './../util'
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'

export default class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modProduct:null
        }
    }
    openModal=(product)=> {
        this.setState({modProduct:product}) //fill the state product with the selected product
    }
    closeModal=()=>{
        this.setState({modProduct:null})
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
                    <Zoom >
                        <Modal isOpen={this.state.modProduct} onRequestClose={this.state.modProduct}>
                            <button className="close-modal" onClick={()=>this.closeModal}>X</button>
                        <div>Modal</div>
                        </Modal>
                    </Zoom>
            </div>
        )
    }
}
