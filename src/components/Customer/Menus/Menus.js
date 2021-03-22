import React, { useState,  useRef  } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Link from '@material-ui/core/Link';
import { useEffect } from 'react';
import './MenuStyles/styles.css'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ButtonGroup from "@material-ui/core/ButtonGroup";import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import pizza1 from './Assets/pizza1.jpg'
import pizza2 from './Assets/pizza2.jpg'
import pizza3 from './Assets/pizza3.jpg'
import pizza4 from './Assets/pizza4.jpg'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CartControl from './cart-control/CartControl';
import { connect } from 'react-redux';

// Dynamic copyright
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// onClick scroll defined
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop) 
const useStyles = makeStyles((theme) => ({
 
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    border: '2px solid #8B8989',
    width: '100%',
    height:'100%'
    

  },
  cardContent: {
    flexGrow: 1,
  },
  Typography: {
    fontFamily: `'Alegreya', serif`
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  normalTextField: {
    maxHeight : '6px',
    maxWidth: '60px',
    autoFocus: true
 },
  image: {
    width: '10px'
  }
}));


 function Menus(props) {
  const classes = useStyles();
  const [Records, setRecords] = useState([]);
  const [Sides, setSides] = useState([]);
  const [Beverages, setBeverages] = useState([]);
  const [CartArray, setCartArray] = useState([]);
  const [pizzaCart] = useState([]);
  const [beverageCart] = useState([]);
  const [sidesCart] = useState([]);
  const sideRef = useRef(null);
  const bevRef = useRef(null);
  const [Counter, setCounter] = useState(0);
  
  const [disabledArray, setdisabledArray] = useState([]);
  const [open, setOpen] = React.useState(false);

  // Notification close
  const handleClose = () => {
    setOpen(false);
  };
// Quantity increment
  const handleIncrement = () => {
      setCounter( Counter + 1);
  };
// Quantity Decrement
  const handleDecrement = () => {
    if(Counter >  1 ){
    setCounter(Counter - 1);
    } 
    else{
      setCounter(Counter + 0);
      setOpen(true)
    }
  };
// Remove Item
  const removeItem = (e,id) => {
    var index = disabledArray.indexOf(id);
    if (index > -1) {
      disabledArray.splice(index, 1);
      var newArray = disabledArray
      setdisabledArray(newArray);
      console.log("In if " + disabledArray)
  }
  }

  // Scroll based on ref
  const sideScroll = () => {
  scrollToRef(sideRef);
  // Move bit upwards
  window.scrollBy(0, -100);
  }

  const beverageScroll = () => {
    scrollToRef(bevRef);
    // Move bit upwards
    window.scrollBy(0, -100);
    }

  // push pizza data on click
  const getPizza = (id, e) => {
    axios.get(`http://localhost:3333/Pizza/${id}`)
    .then( rel =>{
      console.log(rel.data)
      pizzaCart.push(rel.data)

      props.onIncrementPizza(id, pizzaCart)
    });
  } 

// Delete Pizza 
  const deletePizza = (id, e) => {
    pizzaCart.splice(pizzaCart.findIndex(function(i){
        return i.id === id;
    }), 1);
      props.onDecrementPizza(id, pizzaCart)  
  }

// push beverage data on click
  const getBeverage = (id, e) => {
    axios.get(`http://localhost:3333/beverage/${id}`)
    .then( res =>{
      console.log(res.data)
      beverageCart.push(res.data)
      console.log("new cart array in beverage" + JSON.stringify(beverageCart))

      props.onIncreasingBeve(id, beverageCart)
    });
  }

  // Delete Beverage
  const deleteBeverage = (id, e) => {
    beverageCart.splice(beverageCart.findIndex(function(i){
      return i.id === id;
  }), 1);
      //console.log("new cart array after removing Beverage" + JSON.stringify(beverageCart));
      props.onDecreasingBeve(id, beverageCart)
  }


// push sides data on click
  const getSides = (id, e) => {
    axios.get(`http://localhost:3333/pizzasides/${id}`)
    .then( resp =>{
      sidesCart.push(resp.data)
      // console.log("new cart array" + JSON.stringify(CartArray))
      props.onIncrementCart(id, sidesCart); 
    });    
  }

  // Delete Sides
  const deleteSides = (id, e) => {
    sidesCart.splice(sidesCart.findIndex(function(i){
      return i.id === id;
  }), 1);
      // console.log("new cart array after removing" + JSON.stringify(CartArray));
      props.onDecrementCart(id, sidesCart)
  }

  //   Pizza
  useEffect(() => {
    axios.get('http://localhost:3333/Pizza')
      .then(res => {
        setRecords(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  // Sides
  useEffect(() => {
    axios.get('http://localhost:3333/pizzasides')
      .then(result => {
        setSides(result.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  //   Beverage
  useEffect(() => {
    axios.get('http://localhost:3333/beverage')
      .then(response => {
        setBeverages(response.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const addToCart = (num) => {
    console.log('add is clicked' + num);
  }

  return (
    <React.Fragment >
      <CssBaseline />
      <div className="scroll-bg" >
        <div style={{ height: '100px' }} />

        {/* Image carousel */}
        <AliceCarousel
          autoPlayInterval={2000}
          autoPlayDirection="rtl"
          autoPlay={true}
          fadeOutAnimation={true}
          disableButtonsControls = {true}
          disableAutoPlayOnAction={true}
          infinite={true}
        >
          {/* Image with descripion */}
          <div >
          <img src={pizza1} className="sliderimg" alt="pizza1" />
          <center> <h4> ENJOY BEST PIZZA NO WHERE ELSE </h4>  </center>
          </div>
          <div>
          <img src={pizza2} className="sliderimg" alt="pizza2" />
          <center> <h4> FRESHLY MADE PIZZAS SERVED HOT </h4>  </center>
          </div>
          <div>
          <img src={pizza3} className="sliderimg" alt="pizza3" />
          <center> <h4> NO WORRIES ON HEALTH,WE PROVIDE ONLY HYGENIC FOODS  </h4>  </center>
          </div>
          <div>
          <img src={pizza4} className="sliderimg" alt="pizza4" />
          <center> <h4> ALL COVID PRECAUTIONS ARE FOLLOWED </h4>  </center>
          </div>
        </AliceCarousel>
      </div>

      <div className="bg">
      {/* For Pizza display */}
      <div >
        <center> <div className="smooth-scroll-button">
         <Button onClick={sideScroll} variant="contained">Sides</Button> &nbsp;
         <Button onClick={beverageScroll} variant="contained">Beverages</Button>
         {/* <Button onClick={print} variant="contained">Print</Button> */}
        </div> </center>
        <Container maxWidth="md" className="pizza" >
          <h2 className="heading"> <span> Pizzas </span> </h2>
          <Grid container spacing={4}>
            {Records.map((record, id) => (
              <Grid item key={id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    component = "img"
                    className={classes.cardMedia}
                    image={record.imgUrl}
                  />
                  <CardContent className={classes.cardContent}>
                    <Grid style={{ height: '45px' }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {record.name}
                        <img style={{ height: '20px', width: '20px', marginTop: '6px', float: 'right' }} src={record.type == 'Veg' ? "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png" :
                          "https://tpng.net/download/800x800_245-2459071_veg-biryani-png.png"
                        } />
                      </Typography>
                    </Grid>

                    <Grid style={{ height: '85px' }}>
                      <Typography>
                        {record.desc}
                  &nbsp;
                  </Typography>
                    </Grid>
                    <Typography>
                    ₹
                  {parseFloat(record.price).toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    
                  <CartControl label="ADD" disableVal ={props.pizzaResult.includes(record.id) ? true : false}
                    clicked={() => getPizza(record.id)} colour="primary" />  

                    <CartControl label="REMOVE" disableVal ={props.pizzaResult.includes(record.id) ? false : true}
                    clicked={() => deletePizza(record.id)} colour="secondary" />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>

      {/* For Sides */}
      <div>
        <div id="sides" ref={sideRef} style={{ height: '14px' }} />
        <Container maxWidth="md" >
          <h2 className="heading" > <span> Sides </span> </h2>
          <Grid container spacing={4}>
            {Sides.map((side, id) => (
             <Grid item key={side.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    component= "img"
                    className={classes.cardMedia}
                    image={side.imgUrl}
                  />
                  <CardContent className={classes.cardContent}>
                    <Grid style={{ height: '45px' }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {side.name}
                        <img style={{ height: '20px', width: '20px', marginTop: '6px', float: 'right' }} src={side.type == 'Veg' ? "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png" :
                          "https://tpng.net/download/800x800_245-2459071_veg-biryani-png.png"
                        } />
                    &nbsp;
                    </Typography>
                    </Grid>
                    <Typography>
                      ₹
                    {parseFloat(side.price).toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions>

                    <CartControl label="ADD" disableVal ={props.prodResult.includes(side.id) ? true : false}
                    clicked={() => {getSides(side.id);}} colour="primary" />  

                    <CartControl label="REMOVE" disableVal ={props.prodResult.includes(side.id) ? false : true}
                    clicked={() => {deleteSides(side.id); }}colour="secondary" /> 

                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
{/* Show warning when tried to decrease less than 1 */}
      <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          Quantity cannot be zero, Try removing
        </Alert>
      </Snackbar>
      </div>
      </div>

      {/* For Beverages */}
      <div >
        <div id="beverage" ref={bevRef} style={{ height: '14px' }} />
        <Container maxWidth="md" >
          <h2 className="heading"> <span> Beverages </span> </h2>
          <Grid container spacing={4}>
            {Beverages.map((beverage, id) => (
              <Grid item key={id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    component= "img"
                    className={classes.cardMedia}
                    image={beverage.imgUrl}
                  />
                  <CardContent className={classes.cardContent}>
                    <Grid style={{ height: '45px' }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {beverage.name}
                      </Typography>
                    </Grid>

                    <Grid style={{ height: '60px' }}>
                      <Typography>
                        {beverage.desc}
                      </Typography>
                    </Grid>

                    <Typography>
                      ₹
                    {parseFloat(beverage.price).toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions >
                  <CartControl label="ADD" disableVal ={props.beverageResult.includes(beverage.id) ? true : false}
                    clicked={() => {getBeverage(beverage.id)} } colour="primary" />  

                    <CartControl label="REMOVE" disableVal ={props.beverageResult.includes(beverage.id) ? false : true}
                    clicked={() =>deleteBeverage(beverage.id)} colour="secondary" />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      </div>

      {/* Footer */}
      <div style={{height:'5px'}} />
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Thank You!
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Order a delicious pizza on the go, anywhere, anytime. Pizza Hut is happy to assist you with your home delivery.
          Every time you order, you get a hot and fresh pizza delivered at your doorstep in less than thirty minutes. *T&C Apply.
          Hurry up and place your order now!
        </Typography>
        <Copyright />
      </footer>

      {/* End footer */}
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
      crt: state.cart,
      prodResult: state.prodId,
      pizzaResult: state.pizzaId,
      beverageResult: state.beverageId
  };
};

const mapDispatchToProps = dispatch => {
  return {
// Sides
      onIncrementCart: (id, arrayValue) => dispatch({type: 'ADD', value:id, payload:arrayValue}),
      onDecrementCart: (id, arrayValue) => dispatch({type: 'REMOVE', value:id, payload:arrayValue }),
// Pizza
      onIncrementPizza: (id, arrayValue) => dispatch({type: 'INCREMENT', value:id, payload:arrayValue}),
      onDecrementPizza: (id, arrayValue) => dispatch({type: 'DECREMENT', value:id, payload:arrayValue}),
// Beverage
      onIncreasingBeve: (id, arrayValue) => dispatch({type: 'INCREASE', value:id, payload:arrayValue}),
      onDecreasingBeve: (id, arrayValue) => dispatch({type: 'DECREASE', value:id, payload:arrayValue}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menus);
