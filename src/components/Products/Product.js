import { formatMs, IconButton } from '@material-ui/core'
import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconBotton} from "@material-ui/core";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import  useStyle from "./styles";

const Product = ({product, onAddToCart}) => {

    const classes=useStyle();
    console.log(product)
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image.url} title={product.name}/>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant='h5'>
                        {product.name}
                    </Typography>
                    <Typography>
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{__html:product.description}} variant='body2' color='textSecondary'/>
            </CardContent>
            <CardActions disableSpacing className={classes.cardAction}>
                <IconButton aria-label='add to Cart' onClick={()=> onAddToCart(product.id,1)}>
                    <AddShoppingCartIcon/>
                </IconButton>
            </CardActions>

        </Card>
            
    
    )
}

export default Product
