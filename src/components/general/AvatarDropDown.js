import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import styles from './General.module.css'
import Link from 'next/link'
import { UserContext } from '@/components/Context'
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';


export default function AvatarDropDown(props) {

  const [user, setUser] = useContext(UserContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const avatar = props.user.avatar?props.user.avatar:'https://ui-avatars.com/api/?bold=true&background=D30303&name=' + props.user.full_name

  const router = useRouter()

  const logOut = () =>{
      window.google.accounts.id.disableAutoSelect();
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
      deleteCookie('access_token')
      deleteCookie('refresh_token')
      setUser({})
      router.push('/')
      toast.success('You\'ve been logged out. See you next time!')
  }

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
              {/* <div className={styles.topNavAvatar} style={{backgroundImage: `url(${avatar})`}}></div> */}
              <Image className={styles.topNavAvatar} src={avatar} width={50} height={50}/>
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
            Logged in as <span className='boldText' style={{marginLeft: '4px'}}>{props.user?.full_name}</span>
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
          <button onClick={()=>logOut()} className={'removeLinkFormatting boldText greyButton'}>Sign Out</button>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}