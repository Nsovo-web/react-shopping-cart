import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchOrders} from '../Actions/orderActions'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import formatCurrency from '../util';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});



class Orders extends Component {
    componentDidMount(){
        this.props.fetchOrders();
        
    }

     formatDate(date){
        return date ;
    }
    
    render() {
        
        return (
            
            <div>
         <TableContainer component={Paper}>
              <Table className={useStyles.table} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">Items</StyledTableCell>
                    <StyledTableCell align="center">Order Total</StyledTableCell>
                    <StyledTableCell align="center">Date</StyledTableCell>
                </TableRow>
                </TableHead>
               {!this.props.orders? (
                   <div>No orders</div>
               ):(
                <TableBody>
                {this.props.orders.map((order) => (
                    <StyledTableRow key={order._id}>
                    <StyledTableCell component="th" scope="row">
                        {order._id}
                    </StyledTableCell>
                    <StyledTableCell align="right">{order.name}</StyledTableCell>
                    <StyledTableCell align="right">{order.email}</StyledTableCell>
                    <StyledTableCell align="right">{order.cartItems.map((cartItem) => (
                     <>
                       <div>{cartItem.count}{" x "}{cartItem.title}</div>
                       <div>{formatCurrency(cartItem.price)}</div>
                     </>
                     ))}</StyledTableCell>
                    <StyledTableCell align="right">{formatCurrency(order.total)}</StyledTableCell>
                    <StyledTableCell align="right">{this.formatDate(order.createdAt)}</StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
               )}
            </Table>
         </TableContainer>
            </div>
        )
    }
}

export default connect((state)=>({
    orders: state.order.orders

}),{fetchOrders})(Orders)