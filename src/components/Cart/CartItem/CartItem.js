import React from 'react';
import { Card, CardActions, CardContent,CardMedia, Typography, Button} from "@material-ui/core";

import useStyle from "./styles";

const CartItem = ({ item , handleUpdateCartQty,
    handleRemoveFromCart}) => {
    const classes=useStyle();
    console.log(item)
    return (
        <Card>
            {/* <div>{item.name}</div>
            <CardMedia  component="img"
                         height="140"
                         alt='sliiiiikaaa'
                        image= {item.image.url} /> */}
            <CardMedia className={classes.media} component="img"  image={item.image.url} alt="slika" />
            <CardContent className={classes.cardContent}>
                <Typography>{item.name}</Typography>
                <Typography>{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button  type="button" size='small' onClick={()=> handleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button  type="button" size='small' onClick={()=> handleUpdateCartQty(item.id,item.quantity + 1)}>+</Button>
                </div>

                <Button type='button' variant='contained' color="secondary"
                onClick={()=>handleRemoveFromCart(item.id)} > Remove</Button>

            </CardActions>
            
        </Card>
    )
}

export default CartItem
