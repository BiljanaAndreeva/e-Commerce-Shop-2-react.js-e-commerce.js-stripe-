import React from 'react';
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";


const Review = ({checkoutToken}) => {
    console.log("Eve GO  Tokenot..",checkoutToken)
    return (
        <>
            <Typography variant='h6' gutterBottom>Order Summary</Typography>
            <List>
                {checkoutToken.live.line_items.map((product)=>(
                    <ListItem key={product.name} style={{padding:"10px 0"}}>
                        <ListItemText primary={product.name} secondary={`quantity:${product.quantity}`} />
                        <Typography variant='body2'>{product.line_total.formatted_with_symbol}</Typography>
                    </ListItem>

                )) }
                    <ListItem style={{padding:"10px 0 "}}>
                        <ListItemText primary="Total"/>
                        <Typography variant='subtitle1' style={{fontWeight:700 }}>{checkoutToken.live.subtotal.formatted_with_symbol }</Typography>
                    </ListItem>
               
            </List>
            
        </>
    )
}

export default Review
