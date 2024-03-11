import React, { useState } from 'react'
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
import  PropTypes  from 'prop-types';
import clsx from 'clsx';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


import mesa from '../../assets/mesa.jpg';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
function Products() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>

      <Navbar/>

      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent style={{ 
          display: 'flex',
          flexDirection: 'row',
          width:'120vh',
          height: '60vh',
          padding: '5em',
          justifyContent: 'center',
          alignContent: 'center',
          gap: 150
          }}>

          
            <img src={mesa} alt="" style={{ maxHeight: '400px' }} />
          

          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            textAlign: 'left',
            fontSize: '2vh'
            
            
           }}>
            
          <h1>Product Name</h1>
          <p>Description of the product.</p>
          <h3>Price: 5000$</h3>

          <TextField
            select
            label="Cantidad"
            defaultValue={1}
            sx={{ width: 120 }}
            variant="outlined"
            helperText="Elige una cantidad"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            
          </TextField>
          
            <Button variant='contained' style={{ background: red[400],
            width: 'fit-content',
            height: 'auto'
            }} >Agregar al carrito</Button>

            </div>
        </ModalContent>


      </Modal>



      <Box
        sx={{
            display: 'flex',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            bgcolor: 'background.paper',
            color: 'text.secondary',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: 'fit-content',
            gap: 10
        }}>

<Box
        sx={{
            display: 'flex',
            width: '50%',
            borderRadius: 2,
            bgcolor: 'background.paper',
            color: 'text.secondary',
            justifyContent: 'space-evenly',
            alignItems: '',
            height: 'fit-content',
        }}>

    <List sx={lista} aria-label="mailbox folders">
        
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Perfil" ></ListItemText>
          </ListItemButton>
        </ListItem>

        
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Usuarios" />
            </ListItemButton>
          </ListItem>
        

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Productos" />
            </ListItemButton>
          </ListItem>
        
    </List>

    </Box>
        
    <Box
        sx={{
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'center',
            borderRadius: 2,
            color: 'text.secondary',
            height: '100%',
            padding: '0px 0em',
            width: '100%',
        }} >

      <Grid container spacing={{ xs: 5, md: -15 }} columns={{ xs: 4, sm: 8, md: 12 }} >
        {Array.from(Array(10)).map((_, box) => (
          <Grid xs={1} sm={2} md={4} key={box}>
            <Card sx={{ maxWidth: 345, margin: '50px 20px', background: 'paper', height: 'fit-content', display: 'inline-block' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={mesa}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpen} sx={{ width: '10vh', height: 'auto', background:red[200], color:grey[800] }}>ver mas</Button>
      </CardActions>
    </Card>
          </Grid>
        ))}
      </Grid>


      </Box>


    </Box>
    
          <Footer/>

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
  100 : '#DC5A6D',
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



const lista = {
    p: 0,
    width: '100%',
    maxWidth: 360,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
};


export default Products
