import { formatMs } from '@material-ui/core'
import React , { useState, useEffect } from 'react';
import { Stepper,Step,Paper,StepLabel,CircularProgress,Divider, Button, Typography } from "@material-ui/core";
import useStyles from "./style";
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { Link, useNavigate } from "react-router-dom";

const steps=["Shipping Address","Payment details"];

const Checkout = ({cart,order,handleCaptureCheckout,error}) => {
    const classes=useStyles();
    const navigate = useNavigate();

    const [activeStep, setActiveStep ] = useState(0);
    const [checkoutToken, setCheckoutToken]=useState(null);
    const [shippingData, setShippingData]=useState({});

    useEffect(()=>{
        const generateToken = async ()=>{
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type:'cart'})
                console.log(token)
                setCheckoutToken(token)
            
                
            } catch (error) {
                console.log(error)
               navigate("/")
                
            }
           
        };
        generateToken()
    },[cart])

    const nextStep=()=>setActiveStep((prevActiveStap)=>prevActiveStap+1)
    const backStep=()=>setActiveStep((prevActiveStap)=>prevActiveStap-1)


    const next=(data)=>{
        setShippingData(data);
        nextStep();

    }

    
    
    

    const Form = () => activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken} next={next} />
    : <PaymentForm 
        nextStep={nextStep}
        handleCaptureCheckout={handleCaptureCheckout}
        shippingData={shippingData}  
        checkoutToken={checkoutToken} backStep={backStep}/>

    let Confirmation =()=> order.customer ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for your pruchase,{order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider}/>
                <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
            </div>
            <br/>
            <Button component={Link} to="/" type="button" variant='outlined' >Back to Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress/>
        </div>
    )
    if(error){
        <>
            <Typography variant='h5' >Error : {error}</Typography>
            <br/>
            <Button component={Link} to="/" type="button" variant='outlined' >Back to Home</Button>
        </>
    }

    
   
    return (
        <>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography  variant='h4' align='center'> Checkout</Typography>
                    <Stepper className={classes.stepper} activeStep={activeStep}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep=== steps.length ? <Confirmation /> : checkoutToken && <Form/>  } 
                </Paper>
            </main>

            
        </>
    )
}

export default Checkout
