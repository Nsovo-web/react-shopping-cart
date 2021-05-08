import React, { Component } from 'react'
import { DeleteSweep} from '@material-ui/icons'
import formatCurrency from './../util'

export default class Cart extends Component {
    render() {
        
            //const {cartItems} = this.props.cartItems;
         //from the parent component get the cartItems passed as properties
        return (
            <>
                <div>
                    {this.props.cartItems.length === 0?
                    <div className="cart cart-header">The Cart Is Empty</div>
                    :
                    <div className="cart cart-header">You Have {this.props.cartItems.length} Item(s) In The Cart</div>
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
                              <div className="cart">
                              <div className="cart-total">
                                 <div>
                                 Total:{" "}
                                  {formatCurrency(this.props.cartItems.reduce((acc,cItem)=> acc + (cItem.price*cItem.count) ,0))} 
                                   
                                 </div>
                                 {" "}
                                  <button className="proceed">Proceed</button>
                               </div>
                           </div>
                         )}
                   
                </div>
            </>
        )
    }
}
