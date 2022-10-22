import React, { useContext, useState, useEffect } from 'react'
import { ProductContext } from '../Store/ProductContextProvider'
import ProductDetails from './ProductDetails'
import Grid from '@mui/material/Grid';
export default function Products(props) {
    var { getAllproduct,SearchProduct } = useContext(ProductContext)
    let [product, setproduct] = useState([])
    if (props.mc === "All" && props.sc === "All" && props.Brand === "All") {

    }
    else if (props.mc !== "All" && props.sc === "All" && props.Brand === "All") {
        product = product.filter((item) => item.maincategory === props.mc)


    }
    else if (props.mc === "All" && props.sc !== "All" && props.Brand === "All") {
        product = product.filter((item) => item.subcategory === props.sc)


    }
    else if (props.mc === "All" && props.sc === "All" && props.Brand !== "All") {
        product = product.filter((item) => item.brand === props.Brand)


    }
    else if (props.mc !== "All" && props.sc !== "All" && props.Brand === "All") {
        product = product.filter((item) => item.maincategory === props.mc && item.subcategory === props.sc)


    }
    else if (props.mc !== "All" && props.sc === "All" && props.Brand !== "All") {
        product = product.filter((item) => item.maincategory === props.mc && item.brand === props.Brand)


    }
    else if (props.mc === "All" && props.sc !== "All" && props.Brand !== "All") {
        product = product.filter((item) => item.subcategory === props.sc && item.brand === props.Brand)


    }
    else {
        product = product.filter((item) => item.maincategory === props.mc && item.subcategory === props.sc && item.brand === props.Brand)

    }

    let getApiData = async () => {
        if (props.search === "None") {
            let response = await getAllproduct()
            setproduct(response.data)
        }
        else {
            let response = await SearchProduct(props.search)
            setproduct(response.data)
        }
    }
    useEffect(() => {
        getApiData()
    }, [props.mc, props.sc, props.brand, props.search])
    return (
        <>
            <Grid container spacing={2}>
                {
                    product.map((item, index) => {
                        return <Grid key={index} item xxl={2} xl={2} lg={3} md={4} sm={6} xs={12}>

                            <ProductDetails
                                name={item.name}
                                pic={`/public/upload/product/${item.pic1}`}
                                baseprice={item.baseprice}
                                discount={item.discount}
                                fnl={item.finalprice}
                                id={item._id}

                            />
                        </Grid>
                    })
                }



            </Grid>




        </>
    )
}
