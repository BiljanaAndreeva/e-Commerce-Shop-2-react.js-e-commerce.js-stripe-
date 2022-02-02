import React,{ useState,useEffect } from 'react'
import { Select,MenuItem,Typography,InputLabel, Button, Grid } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from './CustomTextField';
import { commerce } from '../../lib/commerce';
import { Link } from "react-router-dom";


const AddressForm = ({checkoutToken, next}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState("");

    const methods=useForm();

    const countries = Object.entries(shippingCountries).map(([code,name])=>(
        {
            id:code,
            label:name
        }
    ))
    
    const subDivisions = Object.entries(shippingSubdivisions).map(([code,name])=>(
        {
            id:code,
            label:name
        }
    ))

    const optionS = shippingOptions.map((sO)=>({
        id:sO.id,
        label: `${sO.description} - ${sO.price.formatted_with_symbol}`

    })
    )

    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
        //console.log(countries)
        setShippingCountries(countries)
         setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async(countryCode)=>{
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0])
       // console.log(subdivisions)
    }

    const fetchOptions= async (checkoutTokenId,country,region=null)=>{
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId,{ country,region});
        setShippingOptions(options);
        setShippingOption(options[0].id)
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id) 
    }, [])

    useEffect(()=>{
       if(shippingCountry) fetchSubdivisions(shippingCountry)
    },[shippingCountry])

    useEffect(()=>{
        if(shippingSubdivision) fetchOptions(checkoutToken.id,shippingCountry,shippingSubdivision)

    },[shippingSubdivision])

    console.log("shippingCountries",shippingCountries)
    console.log("shippingCountry", shippingCountry)
    console.log("shippingSubdivisions", shippingSubdivisions )
    console.log("shippingSubdivision", shippingSubdivision )
    console.log("shippingOptions", shippingOptions )






    console.log("Site drzavi vo array",countries)
    console.log("site subDiv vo array",subDivisions)

    return (
        <>
            <Typography variant="h6">Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data)=>next({...data,shippingCountry, shippingSubdivision, shippingOption})) } >
                    <Grid container spacing={3}>
                        <FormInput required name="firstName" label="First Name" />
                        <FormInput required name="lastName" label="Last Name" />
                        <FormInput required name="address" label="Address" />
                        <FormInput required name="email" label="email" />
                        <FormInput required name="city" label="City" />
                        <FormInput required name="zip" label="Zip/Postal Code" />

                        <Grid item xs={12} sm={6}>
                    
                            {/* <Select value={shippingCountry} fullWidth onChange={(e)=> setShippingCountry(e.target.value)} >
                            <MenuItem key="empty" value={''}></MenuItem>
                                {countries.map((country)=>(
                                    <MenuItem key={country.id} value={country.id} >
                                    {country.label}
                                </MenuItem>
                                ))}
                                
                            </Select> */}

                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e)=> setShippingCountry(e.target.value)} >
                                {shippingCountry?countries.map((country)=>(
                                    <MenuItem key={country.id} value={country.id} >
                                    {country.label}
                                </MenuItem>
                                )) : null}
                                
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            {/* <Select fullWidth value={shippingSubdivision} onChange={(e)=> setShippingSubdivision(e.target.value)} >
                            <MenuItem key="empty" value={''}></MenuItem> 
                                { subDivisions.map((subdivision)=>(
                                      <MenuItem key={subdivision.id} value={subdivision.id}>
                                        {subdivision.label}
                                      </MenuItem>
                                ))}
                                </Select> */}

                                <Select fullWidth value={shippingSubdivision} onChange={(e)=> setShippingSubdivision(e.target.value)} >
                                {shippingSubdivision ? subDivisions.map((subdivision)=>(
                                      <MenuItem key={subdivision.id} value={subdivision.id}>
                                        {subdivision.label}
                                      </MenuItem>
                                )) : null}
                              
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e)=>setShippingOption(e.target.value)} >
                               {optionS.map((option)=>(
                                   <MenuItem key={option.id} value={option.id} >
                                   {option.label}
                               </MenuItem>
                               ))}
                                
                            </Select>
                        </Grid>
                    </Grid>
                    <div style={{ display: "flex" , justifyContent:"space-between"}}>
                        <Button component={Link} to="/cart" variant="outlined" > Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>

                    </div>
                </form>

            </FormProvider>
        </>
    )
}

export default AddressForm
