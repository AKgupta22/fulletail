import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'
export default function ProductDetails(props) {
  return (
    <>


      <Card sx={{ maxWidth: "100%" }}>
        <CardMedia
          component="img"
          height="220"
          image={props.pic}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" height="100px">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price &#8377;  <del>{props.baseprice}</del> {props.fnl}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Discount: {props.discount}%
          </Typography>
        </CardContent>
        <CardActions>
          <Button component={Link} to={`/single-product/${props.id}`}  variant="contained" className="w-100">View more</Button>
        </CardActions>
      </Card>

    </>
  )
}
