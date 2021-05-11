import React, { Component } from 'react'
import { DeleteSweep} from '@material-ui/icons'
import formatCurrency from './../util'
import CartIcon from './CartIcon'


export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
        name:"",
        email:"",
        address:"",
        showCheckout:false}
    }
    handleInput =(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    createOrder = (e)=>{
        e.preventDefault();//will not refresh the page when user clicks on submit button
        //create an order object 
        const order ={
            name: this.state.name,
            email: this.state.email,
            addres: this.state.address,
            cartItems:this.props.cartItems 
        }
        this.props.saveOrder(order);
    }
    render() {
        
            //const {cartItems} = this.props.cartItems;
         //from the parent component get the cartItems passed as properties
        return (
            <>
                <div>
                    {this.props.cartItems.length === 0?
                    <div className="cart cart-header"><CartIcon numberOfItems={this.props.cartItems.length}/>{"  "}No Items</div>
                    :
                    <div className="cart cart-header"><CartIcon numberOfItems={this.props.cartItems.length}/>{"  "}Item(s) In The Cart</div>
                    }
                    
                </div>
                <div>
                    <div className="cart">
                        <ul className="cart-items">
                            {this.props.cartItems.map((item) =>(
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title}/>
                                    </div>
                                    <div className="cart-button">
                                        <div>{item.title}</div>
                                        <div className="right">
                                         <div>{formatCurrency(item.price)} X {item.count}</div>   
                                        <button onClick={()=>this.props.removeItem(item)} className="delete-button" ><DeleteSweep className="delete-icon"/></button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                         {this.props.cartItems.length !== 0 &&(
                             <hr/>
                         )}
                           
                        </ul>
                    </div>
                    {this.props.cartItems.length !== 0 &&(
                        <div>
                            <div className="cart">
                              <div className="cart-total">
                                 <div>
                                 Total:{" "}
                                  {formatCurrency(this.props.cartItems.reduce((acc,cItem)=> acc + (cItem.price*cItem.count) ,0))} 
                                   
                                 </div>
                                 {" "}
                                  <button onClick={()=>{this.setState({showCheckout: true})}} className="proceed">Proceed</button>
                               </div>
                           </div>
                           {this.state.showCheckout && (
                              <div className="cart">
                                <form onSubmit={this.createOrder}>
                                   <ul className="form-container">
                                       <li>
                                           <label>Email</label>
                                           <input name="email" type="email" required onChange={this.handleInput}></input>
                                       </li>
                                       <li>
                                           <label>Name</label>
                                           <input name="name" type="text" required onChange={this.handleInput}></input>
                                       </li>
                                       <li>
                                           <label>Address</label>
                                           <input name="address" type="text" required onChange={this.handleInput}></input>
                                       </li>
                                       <li>
                                           <button type="submit" className="button primary" >Checkout</button>
                                       </li>
                                   </ul>
                                </form>
                              </div> 
                           )}
                        </div>
                         )}
                   
                </div>
            </>
        )
    }
}
