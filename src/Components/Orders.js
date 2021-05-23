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
    fontSize:20,
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

     formatDate(d){
       let date = new Date(d)
        return date.toDateString()// date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() ;
    }
    
    render() {
        
        return (
            
            <div>
         <TableContainer component={Paper}>
              <Table className={useStyles.table} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    
                    <StyledTableCell align="left">Name</StyledTableCell>
                    <StyledTableCell align="left">Email</StyledTableCell>
                    <StyledTableCell align="left">Items</StyledTableCell>
                    <StyledTableCell align="left">Order Total</StyledTableCell>
                    <StyledTableCell align="left">Date</StyledTableCell>
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
                    <StyledTableCell align="left">{order.name}</StyledTableCell>
                    <StyledTableCell align="left">{order.email}</StyledTableCell>
                    <StyledTableCell align="left">{order.cartItems.map((cartItem) => (
                     <>
                       <div>{cartItem.count}{" x "}{cartItem.title}</div>
                       <div>{formatCurrency(cartItem.price)}</div>
                     </>
                     ))}</StyledTableCell>
                    <StyledTableCell align="left">{formatCurrency(order.total)}</StyledTableCell>
                    <StyledTableCell align="left">{this.formatDate(order.createdAt)}</StyledTableCell>
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