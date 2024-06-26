import React, { useContext, useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Modal as BaseModal } from '@mui/base/Modal';
import { styled, css } from '@mui/system';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';

import axios from 'axios';


import mesa from '../../assets/mesa.jpg';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { CartContext } from '../../context/ShoppingCartContext';
import { Azul } from '../../Colors';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';




function Products() {



    const endPoint = 'http://localhost:3001/products/products';
    const endPointCategory = 'http://localhost:3001/category/categories';


    const [data, setData] = useState([]);
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    const [seleccionCategoria, setSeleccionCategoria] = useState(parseInt(''))

    const getCategory = async () => {
        try {
            const category = await axios.get(`${endPointCategory}`);
            setCategory(category.data)
            console.log(category.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategory();
    }, [])

    const getData = async () => {
        try {
            const response = await axios.get(endPoint, {
                headers:
                    { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
            });
            setData(response.data)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    useEffect(() => {
        getData();
        localStorage.getItem("cart") === null ? setCart([]) : setCart(JSON.parse(localStorage.getItem("cart")))
    }, [])


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(cart);
    }, [cart])

    /* const filtro = () => {
      const [filterCategory, setFilterCategory] = useState('todos');
  
      const handleCategoryChange = (e) => {
        setFilterCategory(e.target.value);
      };
  
      const filterProducts = data.filter((product) => {
        if(filterCategory ==='todos'){
          return true;
        }
        return data.categoryId === filterCategory;
      }) */





    const addToCart = (product) => {
        setCart((currItems) => {

            const isItemsFound = currItems.find((producto) => producto.id === product.id)

            if (isItemsFound) {
                return currItems.map((producto) => {

                    if (producto.id === product.id) {
                        return { ...producto, quantity: parseInt(producto.quantity + 1) }
                    }
                    return producto;
                });
            } else {
                return [...currItems, { quantity: 1, ...product }]
            }
        });

        toast.success('Producto agregado Correctamente')
        console.log('Agregando Producto');
    };



    const getQuantityById = (id) => {
        return cart.find((product) => product.id === id)?.quantity || 0;
    };

    const quantityPerItem = getQuantityById(product.id);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function filtrarDatos(data) {
        if (!seleccionCategoria || seleccionCategoria == 'todos') {
            return data;
        }

        return data.filter(product => product.categoryId === seleccionCategoria)
    }

    const categoriasFiltradas = filtrarDatos(data)

    return (
        <>

            <Navbar />


            <FormControl sx={{ margin: '3em' }}>
                <InputLabel id="demo-simple-select-label">Categorias</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value='todos'
                    label="Categoria"
                    onChange={(e) => setSeleccionCategoria(e.target.value)}
                >
                    <MenuItem value={'todos'}>Todos</MenuItem>
                    {category.map((category, idx) => (
                        <MenuItem key={idx} value={category.id}>{category.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>



            <ul>
                {category.map((category) => {
                    <li>
                        <Typography variant="body2" color="initial" sx={{ fontSize: '30em' }}>
                            {category.name}
                        </Typography>
                    </li>
                })}
            </ul>


            <Grid container /* spacing={{ xs: 4, md: 0, }} */ columns={{ xs: 5, sm: 4 }} sx={{ gap: '2em' }}>
                {categoriasFiltradas.map((product, idx) => (
                    <Grid key={product.id}>
                        <Card key={idx} sx={{ width: '300px', maxWidth: 345, margin: '4em 20px', background: 'paper', height: 'fit-content', display: 'inline-block' }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image={`http://localhost:3001/image/${product.imagenURL}`}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.name}
                                </Typography>
                                <Typography gutterBottom variant="body1" color="grey" component="div">
                                    {product.description}
                                </Typography>
                                <Typography variant="h5" color={Azul[500]}>
                                    Precio: ${product.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => addToCart(product)} sx={{ width: '100%', height: 'auto', background: Azul[500], color: grey[800] }}>Añadir al carrito</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>







            <Footer />

            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />

        </>
    )
}

const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
        <div
            className={clsx({ 'base-Backdrop-open': open }, className)}
            ref={ref}
            {...other}
        />
    );
});

Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
};

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const red = {
    100: '#DC5A6D',
    200: '#C93B50',
    300: '#BB1A32',
    400: '#B3001B'
}

const TriggerButton = styled('button')(
    ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
  `,
);

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled('div')(
    ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);

export default Products
