import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import pic1 from '../asset/images/banner1.jpg'
import pic2 from '../asset/images/banner2.jpg'
import pic3 from '../asset/images/banner3.jpg'
import Products from './Products'

var items = [
    {
        pic: pic1
    },
    {
        pic: pic2
    },
    {
        pic: pic3
    }
]

function Item(props) {
    return (
        <Paper>
            <img src={props.item.pic} alt="" height="500px" width="100%" />

        </Paper>
    )
}
export default function Home() {


    return (
        <>

            <div className="container-fluid mt-1">

                <Carousel>
                    {

                        items.map((item, i) => <Item key={i} item={item} />)

                    }
                </Carousel>
                <h5 className="bgcol p-3 text-light text-center">Latest Product Section</h5>
                <Products mc="All" sc="All" Brand="All" search="None"/>

            </div>

        </>
    )
}
