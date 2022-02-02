import React from 'react'
import { Container, Typography, Grid, Button } from '@material-ui/core';
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem"
import { Link } from "react-router-dom"

const Cart = ({cart,  handleUpdateCartQty,
                handleRemoveFromCart,
                handleEmptyCart }) => { 
    // const isEmpty = !cart.line_items; 

    const classes = useStyles();
    
    const EmptyCart = () => (
        <Typography variant='subtitle1'>You have no item in the Cart,
            <Link to="/" className={classes.link}>start adding some</Link>
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={4} key={item.id} >
                        <CartItem item={item} handleUpdateCartQty={handleUpdateCartQty}
                                   handleRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                   
                ))}
            </Grid>
           
            <div className={classes.cardDetails} >
                        <Typography variant='h4'>
                            Subtotal : { cart.subtotal.formatted_with_symbol}
                        </Typography>
                        <div>
                            <Button className={classes.emptyButton} size="large" variant='contained' type='button' color="secondary"
                             onClick={handleEmptyCart}  >Empty Cart</Button>
                            <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" variant='contained' type='button' color="primary" >Checkout</Button>
                        </div>

                    </div>
        </>
    )

    if(!cart.line_items) return "Loading..."

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant='h3' gutterBottom >Your shopping cart</Typography>
        { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
            
        </Container>
    )
}

export default Cart
