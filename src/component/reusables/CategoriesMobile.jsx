import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Collapse,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const CategoriesMobile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState({
    foreign: false,
    local: false,
    men: false,
    women: false,
    unisex: false,
    accessories: false
  });

  const handleCategoryToggle = (category) => {
    setOpenCategories({
      ...openCategories,
      [category]: !openCategories[category]
    });
  };

  // Brand items for each category
  const foreignBrands = ['Prada', 'Gucci', 'Balenciaga', 'Fenty', 'Botega Venetta'];
  const localBrands = ['Veekee James', 'Mai Atafo', 'Balenciaga', 'Fenty', 'Botega Venetta'];
  const menBrands = ['Prada', 'Gucci', 'Balenciaga', 'Fenty', 'Botega Venetta'];
  const womenBrands = ['Prada', 'Gucci', 'Balenciaga', 'Fenty', 'Botega Venetta'];
  const unisexBrands = ['Prada', 'Gucci', 'Balenciaga', 'Fenty', 'Botega Venetta'];
  const accessoriesBrands = ['Shoes', 'Bags', 'Jewelries', 'Pouches', 'Ring Lights', 'wefgyu', 'ewfgfg', 'tdfeyfy'];

  const drawerContent = (
    <Box sx={{ width: 250, backgroundColor: '0B261F', height: '100%', color: 'black', paddingTop: '4px' }} role="presentation">
      <List>
        {/* Foreign Brands */}
        <ListItem button onClick={() => handleCategoryToggle('foreign')}>
          <ListItemText primary="Foreign Brands" />
          {openCategories.foreign ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCategories.foreign} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {foreignBrands.map((brand, index) => (
              <ListItem button key={index} sx={{ pl: 4 }}>
                <ListItemText primary={brand} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        {/* Local Brands */}
        <ListItem button onClick={() => handleCategoryToggle('local')}>
          <ListItemText primary="Local Brands" />
          {openCategories.local ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCategories.local} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {localBrands.map((brand, index) => (
              <ListItem button key={index} sx={{ pl: 4 }}>
                <ListItemText primary={brand} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        {/* Men */}
        <ListItem button onClick={() => handleCategoryToggle('men')}>
          <ListItemText primary="Men" />
          {openCategories.men ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCategories.men} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {menBrands.map((brand, index) => (
              <ListItem button key={index} sx={{ pl: 4 }}>
                <ListItemText primary={brand} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        {/* Women */}
        <ListItem button onClick={() => handleCategoryToggle('women')}>
          <ListItemText primary="Women" />
          {openCategories.women ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCategories.women} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {womenBrands.map((brand, index) => (
              <ListItem button key={index} sx={{ pl: 4 }}>
                <ListItemText primary={brand} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        {/* Unisex */}
        <ListItem button onClick={() => handleCategoryToggle('unisex')}>
          <ListItemText primary="Unisex" />
          {openCategories.unisex ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCategories.unisex} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {unisexBrands.map((brand, index) => (
              <ListItem button key={index} sx={{ pl: 4 }}>
                <ListItemText primary={brand} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        {/* Accessories */}
        <ListItem button onClick={() => handleCategoryToggle('accessories')}>
          <ListItemText primary="Accessories" />
          {openCategories.accessories ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCategories.accessories} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {accessoriesBrands.map((brand, index) => (
              <ListItem button key={index} sx={{ pl: 4 }}>
                <ListItemText primary={brand} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Box>
  );

  if (!isMobile) return null;

  return (
    // <>
    //   <AppBar position="sticky" sx={{ backgroundColor: '#fff', color: '#222', boxShadow: 0 }}>
    //     <Toolbar>
    //       <IconButton
    //         edge="start"
    //         color="inherit"
    //         aria-label="menu"
    //         onClick={() => setDrawerOpen(true)}
    //         sx={{ mr: 2 }}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //     </Toolbar>
    //   </AppBar>
    //   <Drawer
    //     anchor="left"
    //     open={drawerOpen}
    //     onClose={() => setDrawerOpen(false)}
    //   >
    //     {drawerContent}
    //   </Drawer>
    // </>
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setDrawerOpen(true)}
        sx={{ 
          padding: 2,
          color: '#222',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          }
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default CategoriesMobile;