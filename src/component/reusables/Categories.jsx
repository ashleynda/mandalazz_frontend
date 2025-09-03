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
import { useProductsByBrand } from '../../lib/hooks/useCategoryBrand'
import useProductsQuery from '@/src/lib/hooks/favourites/useProductMutation';



const Categories = () => {
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
  const [category, setCategory] = useState('foreign'); // State to hold selected category
  const { data: allProductsData, isLoading: loadingAllProducts } = useProductsQuery();
  const productsList = allProductsData?.data?.products || [];

  const foreignBrands = Array.from(
    new Set(
      productsList
        .filter((p) => p.brandType === 'foreign')
        .map((p) => p.brand)
    )
  ).map((brand, index) => ({ id: index, name: brand }));

  const localBrands = Array.from(
    new Set(
      productsList
        .filter((p) => p.brandType === 'local')
        .map((p) => p.brand)
    )
  ).map((brand, index) => ({ id: index, name: brand }));


  const { data: productsByBrand, isLoading: loadingBrandProducts } = useProductsByBrand(selectedBrand);

  if (loadingAllProducts) return <p>Loading brands...</p>;

  const handleCategoryClick = (value, type = 'category') => {
    const param = type === 'brand' ? 'brand' : 'category';
    router.push(`/viewProductByCategory?${param}=${encodeURIComponent(value)}`);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleCategoryToggle = (category) => {
    setOpenCategories({
      ...openCategories,
      [category]: !openCategories[category]
    });
  };

  const handleForeignClick = (event) => {
    setCategory('foreign'); 
    setForeignAnchorEl(event.currentTarget);
  };
  const handleForeignClose = () => {
    setForeignAnchorEl(null);
  };

  const handleLocalClick = (event) => {
    setCategory('local'); 
    setLocalAnchorEl(event.currentTarget);
  };
  const handleLocalClose = () => {
    setLocalAnchorEl(null);
  };

  const handleAccessoriesClose = () => {
    setAccessoriesAnchorEl(null);
  };

  const accessoriesBrands = ['Shoes', 'Bags', 'Jewelries', 'Pouches', 'Ring Lights', 'wefgyu', 'ewfgfg', 'tdfeyfy'];



  if (isMobile) {
    return null; 
  }

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#0B261F', color: 'white', top: 50, zIndex: 999, height: 50, overflowX: 'none', whiteSpace: 'nowrap' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'center', gap: 4 }}>
          <>
            <Box>
              <Button
                onClick={handleForeignClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  color: foreignAnchorEl ? '#0B261F' : 'white',
                  backgroundColor: foreignAnchorEl ? '#f0f0f0' : 'transparent',
                }}
              >
                Foreign Brands
              </Button>

              <Menu
                anchorEl={foreignAnchorEl}
                open={Boolean(foreignAnchorEl)}
                onClose={handleForeignClose}
              >
                {foreignBrands.map((brand) => (
                  <MenuItem
                    key={brand._id}
                    onClick={() => {
                      handleForeignClose();
                      setSelectedBrand(brand.name);
                      handleCategoryClick(brand.name, 'brand');
                    }}
                  >
                    {brand.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box>
              <Button
                onClick={handleLocalClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  color: localAnchorEl ? '#0B261F' : 'white',
                  backgroundColor: localAnchorEl ? '#f0f0f0' : 'transparent',
                }}
              >
                Local Brands
              </Button>

              <Menu
                anchorEl={localAnchorEl}
                open={Boolean(localAnchorEl)}
                onClose={handleLocalClose}
              >
                {localBrands.map((brand) => (
                  <MenuItem
                    key={brand._id}
                    onClick={() => {
                      handleLocalClose();
                      setSelectedBrand(brand.name);
                      handleCategoryClick(brand.name, 'brand');
                    }}
                  >
                    {brand.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ position: 'relative' }}>
              <Button
                onClick={() => handleCategoryClick('men')}
                sx={{
                  color: 'white',
                  backgroundColor: menAnchorEl ? '#f0f0f0' : 'transparent',
                }}
              >
                Men
              </Button>
            </Box>

            {/* Women */}
            <Box sx={{ position: 'relative' }}>
              <Button
                onClick={() => handleCategoryClick('women')}
                sx={{
                  color: 'white',
                  backgroundColor: womenAnchorEl ? '#f0f0f0' : 'transparent',
                }}
              >
                Women
              </Button>

            </Box>

            <Box sx={{ position: 'relative' }}>
              <Button
                onClick={() => handleCategoryClick('unisex')}
                sx={{
                  color: 'white',
                  backgroundColor: unisexAnchorEl ? '#f0f0f0' : 'transparent',
                }}
              >
                Unisex
              </Button>

            </Box>

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
                    onClick={() => {
                      handleAccessoriesClose();
                      handleCategoryClick("general"); // ✅
                    }}
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