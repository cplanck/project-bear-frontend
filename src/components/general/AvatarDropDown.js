import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from './General.module.css'
import Link from 'next/link'


export default function AvatarDropDown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <div className={['textButton', styles.topNavAddButton].join(" ")}>
              <div className={styles.topNavAvatar} style={{backgroundImage: `url(${props.avatar})`}}></div>
            </div>
          </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            bgcolor: 'var(--main-bg-color)',
            border: '1px solid var(--dark-theme-grey-4)',
            mt: .5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem className={styles.menuItem} onClick={handleClose}>
            Logged in as <span className='boldText' style={{marginLeft: '4px'}}>Cameron Planck</span>
        </MenuItem>
        <Divider className={styles.menuDivider}/>
        <MenuItem className={styles.menuItem} onClick={handleClose}>
            <Link  href='/profile/overview' className={styles.link}>
                Your Profile
            </Link>
        </MenuItem>
        <MenuItem className={styles.menuItem} onClick={handleClose}>
            <Link href='/dashboard/instruments' className={styles.link}>
                Your Instruments
            </Link>
        </MenuItem>
        <MenuItem className={styles.menuItem} onClick={handleClose}>
            <Link href='/dashboard/deployments' className={styles.link}>
               Your Deployments
            </Link>
        </MenuItem>
        <MenuItem className={styles.menuItem} onClick={handleClose}>
            <Link href='/dashboard/data-models' className={styles.link}>
                Your Data Models
            </Link>
        </MenuItem>
        <MenuItem className={styles.menuItem} onClick={handleClose}>
            <Link href='/binary-map' className={styles.link}>
                Your Binary Maps
            </Link>
        </MenuItem>
        <Divider className={styles.menuDivider}/>
        <MenuItem className={styles.menuItem} onClick={handleClose}>
          Sign Out
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}