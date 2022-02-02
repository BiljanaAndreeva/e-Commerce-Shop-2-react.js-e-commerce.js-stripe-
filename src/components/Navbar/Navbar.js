import React from 'react';
import { AppBar,Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart} from "@material-ui/icons";
import logo from "../../assets/commerce.png";
import { Link, useLocation } from "react-router-dom";


import useStyle from "./styles"

const Navbar = ({totalItems}) => {
    const location= useLocation();


    const classes=useStyle();
    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to="/" variant='h6' className={classes.title} color="inherit">
                        <img src={logo} alt='Commerce.js' height="45px" className={classes.image}/>
                        Commerce.js
                    </Typography>
                    <div className={classes.grow}/>

                    { location.pathname==="/" && (
                        <div className={classes.button}>
                            
                            <IconButton component={Link} to ="/cart" aria-label='show item in the cart' color="inherit" >
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart/>
                                </Badge>

                            </IconButton>
                        </div> )
                    }    
                </Toolbar>

            </AppBar>
            
        </>
    )
}

export default Navbar
