import React from 'react';
import {Grid} from "@material-ui/core";
import Product from "./Product";

// const products=[
//     { id:1, name:"shoes", description:"running shoes",price:"$55",image: "https://m.media-amazon.com/images/I/81SXdXPEVRL._AC_UX695_.jpg"},
//     { id:2, name:"macbook", description:"Apple macbook",price:"$15", image:"https://m.media-amazon.com/images/I/91wYB53Y4aL._AC_SY355_.jpg" },
//     { id:3, name: "clock", description:"allways on time",price:"10$",image:"https://m.media-amazon.com/images/I/81os6R4wnNL._AC_SY450_.jpg" }
// ];

const Products = ({products,onAddToCart}) => {
    return (
        <div>
            <Grid container justifyContent='center' spacing={4} >
                {products.map((product)=>(
                    <Grid item key={product.id} xs={12} sm={8} md={4}>
                        <Product product={product} onAddToCart={onAddToCart } />
                    </Grid>

                )) }


            </Grid>
            
        </div>
    )
}

export default Products;
