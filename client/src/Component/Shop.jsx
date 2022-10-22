import React, { useContext, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Products from './Products'
import { useParams, Link } from 'react-router-dom';
import { MainCategory } from '../Store/MainCategoryContext'
import { SubCategory } from '../Store/SubCategoryContext'
import { Brand } from '../Store/BrandContext'
export default function Shop() {
  let { mc, sc, brand, search } = useParams()
  let [maincategory, setmaincategory] = useState([])
  let [subcategory, setsubcategory] = useState([])
  let [brands, setbrands] = useState([])
  let { getAllmaincategory } = useContext(MainCategory)
  let { getAllsubcategory } = useContext(SubCategory)
  let { getAllbrand } = useContext(Brand)

  let getApiData = async () => {
    let response1 = await getAllmaincategory()
    setmaincategory(response1.data)
    let response2 = await getAllsubcategory()
    setsubcategory(response2.data)
    let response3 = await getAllbrand()
    setbrands(response3.data)
  }

  useEffect(() => {
    getApiData()
  }, [])
  return (
    <>
      <div className="container-fluid mt-2">

        <Grid container spacing={2}>

          <Grid item md={2} xs={12} >

            <h5 className="bgcol textcol text-center p-2">Menu</h5>
            <Box sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }}>
              <nav aria-label="secondary mailbox folders">
                <h5 className="textcol text-center bgcol p-1">Main Category</h5>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} to={`/Shop/All/${sc}/${brand}/${search ? search : "None"}`}>
                      <ListItemText primary="All" />
                    </ListItemButton>
                  </ListItem>
                  {
                    maincategory.map((item, i) => {
                      return <ListItem key={i} disablePadding>
                        <ListItemButton component={Link} to={`/Shop/${item.name}/${sc}/${brand}/${search ? search : "None"}`}>
                          <ListItemText primary={item.name} />
                        </ListItemButton>
                      </ListItem>
                    })
                  }
                </List>
              </nav>

              <nav aria-label="secondary mailbox folders">
                <h5 className="textcol text-center bgcol p-1">Sub Category</h5>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} to={`/Shop/${mc}/All/${brand}/${search ? search : "None"}`}>
                      <ListItemText primary="All" />
                    </ListItemButton>
                  </ListItem>
                  {
                    subcategory.map((item, i) => {
                      return <ListItem key={i} disablePadding>
                        <ListItemButton component={Link} to={`/Shop/${mc}/${item.name}/${brand}/${search ? search : "None"}`}>
                          <ListItemText primary={item.name} />
                        </ListItemButton>
                      </ListItem>
                    })
                  }
                </List>
              </nav>

              <nav aria-label="secondary mailbox folders">
                <h5 className="textcol text-center bgcol p-1">Brands</h5>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} to={`/Shop/${mc}/${sc}/All/${search ? search : "None"}`} >
                      <ListItemText primary="All" />
                    </ListItemButton>
                  </ListItem>
                  {
                    brands.map((item, i) => {
                      return <ListItem key={i} disablePadding>
                        <ListItemButton component={Link} to={`/Shop/${mc}/${sc}/${item.name}/${search ? search : "None"}`}>
                          <ListItemText primary={item.name} />
                        </ListItemButton>
                      </ListItem>
                    })
                  }


                </List>
              </nav>

            </Box>
          </Grid>
          <Grid item md={10} xs={12} >
            <h5 className="bgcol textcol text-center p-2">Shop Section</h5>
            <Products mc={mc} sc={sc} Brand={brand} search={search} />
          </Grid>

        </Grid>



      </div>



    </>
  )
}
