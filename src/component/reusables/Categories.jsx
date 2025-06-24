"use client";

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Box,
  Container,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  useMediaQuery,
  useTheme

} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from "../../lib/hooks/useGetProductsByCategory";
import { useRouter } from 'next/navigation';



const Categories = () => {
  // State for each dropdown menu
  const [foreignAnchorEl, setForeignAnchorEl] = useState(null);
  const [localAnchorEl, setLocalAnchorEl] = useState(null);
  const [menAnchorEl, setMenAnchorEl] = useState(null);
  const [womenAnchorEl, setWomenAnchorEl] = useState(null);
  const [unisexAnchorEl, setUnisexAnchorEl] = useState(null);
  const [accessoriesAnchorEl, setAccessoriesAnchorEl] = useState(null);
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
  const [selectedBrand, setSelectedBrand] = useState(null);
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products", selectedBrand],
    queryFn: () => getProducts(selectedBrand),
    enabled: !!selectedBrand, // Only run when brand is selected
  });
  const router = useRouter();
  console.log("Products:", products);

const handleCategoryClick = (category) => {
  router.push(`/viewProductByCategory?category=${encodeURIComponent(category)}`);
};



  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Toggle category collapse in mobile menu
  const handleCategoryToggle = (category) => {
    setOpenCategories({
      ...openCategories,
      [category]: !openCategories[category]
    });
  };

  // Foreign brands dropdown handlers
  const handleForeignClick = (event) => {
    setForeignAnchorEl(event.currentTarget);
  };
  const handleForeignClose = () => {
    setForeignAnchorEl(null);
  };

  // Local brands dropdown handlers
  const handleLocalClick = (event) => {
    setLocalAnchorEl(event.currentTarget);
  };
  const handleLocalClose = () => {
    setLocalAnchorEl(null);
  };

  // Men dropdown handlers
  const handleMenClick = (event) => {
    setMenAnchorEl(event.currentTarget);
  };
  const handleMenClose = () => {
    setMenAnchorEl(null);
  };

  // Women dropdown handlers
  const handleWomenClick = (event) => {
    setWomenAnchorEl(event.currentTarget);
  };
  const handleWomenClose = () => {
    setWomenAnchorEl(null);
  };

  // Unisex dropdown handlers
  const handleUnisexClick = (event) => {
    setUnisexAnchorEl(event.currentTarget);
  };
  const handleUnisexClose = () => {
    setUnisexAnchorEl(null);
  };

  // Accessories dropdown handlers
  const handleAccessoriesClick = (event) => {
    setAccessoriesAnchorEl(event.currentTarget);
  };
  const handleAccessoriesClose = () => {
    setAccessoriesAnchorEl(null);
  };

  // Brand items for each category
  const foreignBrands = ['Prada', 'Gucci', 'Balenciaga', 'Fenty', 'Botega Venetta'];
  const localBrands = ['Veekee James', 'Mai Atafo', 'Balenciaga', 'Fenty', 'Botega Venetta']; // Replace with actual local brands
  const menBrands = ['Prada', 'Gucci', 'Balenciaga', 'Fenty', 'Botega Venetta'];
  const womenBrands = ['Prada', 'Gucci', 'Balenciaga', 'Fenty', 'Botega Venetta'];
  const unisexBrands =
    ['Prada', 'Gucci', 'Balenciaga', 'Fenty', 'Botega Venetta'];
  const accessoriesBrands = ['Shoes', 'Bags', 'Jewelries', 'Pouches', 'Ring Lights', 'wefgyu', 'ewfgfg', 'tdfeyfy'];



  if (isMobile) {
    return null; // Hide AppBar and dropdowns on mobile
  }

  return (
    // <div className=''>
    <AppBar position="fixed" sx={{ backgroundColor: '#0B261F', color: 'white', top: 50, zIndex: 999, height: 50, overflowX: 'none', whiteSpace: 'nowrap' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'center', gap: 4 }}>
          <>
            <Box sx={{ position: 'relative' }}>
              <Button
                onClick={handleForeignClick}
                sx={{
                  color: foreignAnchorEl ? '#0B261F' : 'white',
                  backgroundColor: foreignAnchorEl ? '#f0f0f0' : 'transparent',
                  // borderRight: '1px solid #e0e0e0'
                }}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Foreign Brands
              </Button>
              <Menu
                anchorEl={foreignAnchorEl}
                open={Boolean(foreignAnchorEl)}
                onClose={handleForeignClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                sx={{ mt: 1 }}
                PaperProps={{
                  sx: {
                    // p: 6,
                  }
                }}
              >
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, max-content)',
                    columnGap: 3,
                    rowGap: 1,
                  }}
                >
                  {(() => {
                    const items = foreignBrands;
                    const half = Math.ceil(items.length / 2);
                    const left = items.slice(0, half);
                    const right = items.slice(half);

                    return left.map((item, idx) => (
                      <React.Fragment key={item}>
                        <MenuItem onClick={handleForeignClose}>{item}</MenuItem>
                        {right[idx] && (
                          <MenuItem onClick={handleForeignClose}>{right[idx]}</MenuItem>
                        )}
                      </React.Fragment>
                    ));
                  })()}
                </Box>
              </Menu>

            </Box>

            {/* Local Brands */}
            <Box sx={{ position: 'relative' }}>
              <Button
                onClick={handleLocalClick}
                sx={{
                  color: localAnchorEl ? '#0B261F' : 'white',
                  backgroundColor: localAnchorEl ? '#f0f0f0' : 'transparent',
                  // borderRight: '1px solid #e0e0e0'
                }}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Local Brands
              </Button>
              <Menu
                anchorEl={localAnchorEl}
                open={Boolean(localAnchorEl)}
                onClose={handleLocalClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                sx={{ mt: 1 }}
              >
                {localBrands.map((brand) => (
                  <MenuItem
                    key={brand}
                    onClick={handleLocalClose}
                    sx={{ minWidth: '150px' }}
                  >
                    {brand}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Men */}
            <Box sx={{ position: 'relative' }}>
              <Button
                onClick={() => handleCategoryClick('man')}
                sx={{
                  color: 'white',
                  backgroundColor: menAnchorEl ? '#f0f0f0' : 'transparent',
                  // borderRight: '1px solid #e0e0e0'
                }}
              >
                Men
              </Button>
              {/* <Menu
                anchorEl={menAnchorEl}
                open={Boolean(menAnchorEl)}
                onClose={handleMenClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                sx={{ mt: 1 }}

              >
                {menBrands.map((brand) => (
                  <MenuItem
                    key={brand}
                    onClick={handleMenClose}
                    sx={{ minWidth: '150px' }}
                  >
                    {brand}
                  </MenuItem>
                ))}
              </Menu> */}
            </Box>

            {/* Women */}
            <Box sx={{ position: 'relative' }}>
              <Button
                onClick={() => handleCategoryClick('woman')}
                sx={{
                  color: 'white',
                  backgroundColor: womenAnchorEl ? '#f0f0f0' : 'transparent',
                  // borderRight: '1px solid #e0e0e0'
                }}
              >
                Women
              </Button>
            
            </Box>

            {/* Unisex */}
            <Box sx={{ position: 'relative' }}>
              <Button
                onClick={() => handleCategoryClick('unisex')}
                sx={{
                  color: 'white',
                  backgroundColor: unisexAnchorEl ? '#f0f0f0' : 'transparent',
                  // borderRight: '1px solid #e0e0e0'
                }}
              >
                Unisex
              </Button>
              
            </Box>

            {/* Accessories */}
            <Box sx={{ position: 'relative' }}>
              <Button
                onClick={() => handleCategoryClick('accessories')}
                sx={{
                  color: accessoriesAnchorEl ? '#0B261F' : 'white',
                  backgroundColor: accessoriesAnchorEl ? '#f0f0f0' : 'transparent',
                }}
              >
                Accessories
              </Button>
              <Menu
                anchorEl={accessoriesAnchorEl}
                open={Boolean(accessoriesAnchorEl)}
                onClose={handleAccessoriesClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                sx={{ mt: 1 }}
              >
                {accessoriesBrands.map((brand) => (
                  <MenuItem
                    key={brand}
                    onClick={handleAccessoriesClose}
                    sx={{ minWidth: '150px' }}
                  >
                    {brand}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </>

        </Toolbar>
      </Container>
    </AppBar>
    // </div>
  );
};

export default Categories;