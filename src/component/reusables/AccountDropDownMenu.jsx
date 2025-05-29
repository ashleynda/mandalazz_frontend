import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Divider,
  ListItemIcon,
  IconButton,
  Tooltip,
  Box
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import UploadAvatars from '../profile';
import { useRouter } from 'next/navigation';
import { logout } from '../../lib/utils/logout'; // Adjust the import path as necessary

export function AccountDropdownMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Tooltip title="Account settings">
        <Box
          onClick={handleClick}
          className="cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2 px-2 py-1"
        >
          {/* <Avatar sx={{ width: 32, height: 32 }}>OA</Avatar> */}
          <UploadAvatars />
          <Typography fontSize="14px" fontWeight={500} color="#191818">
            My Account
          </Typography>
          <ArrowDropDownIcon sx={{ color: '#191818' }} />
        </Box>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            minWidth: 220,
            borderRadius: 2,
            overflow: 'visible',
          },
        }}
      >
        <Box px={2} py={1}>
          <Typography variant="caption" color="text.secondary">
            Signed in as
          </Typography>
          <Typography fontWeight={600}>Omolara Ashley</Typography>
          <Typography variant="body2" color="text.secondary">
            omolots.ash@gmail.com
          </Typography>
        </Box>

        <Divider />

        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Account settings
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <HelpOutlineIcon fontSize="small" />
          </ListItemIcon>
          Help center
        </MenuItem>

        <Divider />

        <MenuItem 
        onClick={logout}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </Box>
  );
}
