import Link from 'next/link';
import styles from './General.module.css'
import logo from '@/images/bit-bear-logo-dark.png'
import { UserContext, UserLoggedInContext } from '@/components/Context'
import { useState, useContext } from 'react';

import AddIcon from '@mui/icons-material/Add';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import AddDropDown from './AddDropDown'
import AvatarDropDown from './AvatarDropDown'
import Image from 'next/image'
import { useRef } from "react";
import { Divider } from '@mui/material';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function SearchDropDown(props){

        return(
            <div className={styles.searchOpen}>
                Search Drop Down!
                <Link href='/dashboard' className={'removeLinkFormatting boldText'} onClick={()=>{props.setSearchOpen(false)}}>Dashboard</Link>
                <Link href='/dashboard/instruments' className={'removeLinkFormatting boldText'} onClick={()=>{props.setSearchOpen(false)}}>Instruments</Link>
            </div>
        )
}

function SearchBar(props){

    const ref = useRef();
    const searchBox = useRef();
    const [searchOpen, setSearchOpen] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            
          if (searchBox.current && !searchBox.current.contains(event.target)) {
            setSearchOpen(false)
          }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
      }, []);

    return(
        <div className={[styles.searchBarWrapperTop, props.displayClass].join(' ')}>
                <div ref={searchBox} className={styles.searchBarWrapper} style={searchOpen&props.grow?{width: '400px'}:{}}>
                    <input ref={ref} onFocus={() => {setSearchOpen(true)}} className={[styles.searchInput, props.displayClass].join(' ')} placeholder='Search anything'/>
                    {searchOpen?
                        <SearchDropDown setSearchOpen={setSearchOpen}/>
                    :
                    ''
                    }
                </div>
                <div href={'/dashboard'} className={[styles.topNavLinkGroup, 'hideOnSmall'].join(' ')} style={searchOpen&props.grow?{marginLeft: '430px'}:{marginLeft: '260px'}}>
                    <Link href={'/dashboard/overview'} className={'removeLinkFormatting me-3'}>Dashboard</Link>
                    <Link href={'/learn'} className={'removeLinkFormatting me-3'}>Learn</Link>
                    {/* <Link href={'/about'} className={'removeLinkFormatting me-3'}>Pricing</Link>
                    <Link href={'/login'} className={'removeLinkFormatting me-3'}>Login</Link> */}
                </div>
        </div>
    )
}

function SmallMenu(props){

    return(
        props.smallMenuOpen?
            <div className={[styles.smallMenuWrapper, 'showOnSmall'].join(' ')}>
                <SearchBar searchOpen={true} displayClass={'showOnSmall'} grow={false}/>
                <div className={styles.smallMenulinkGroup}>
                    <Link href='/dashboard/overview' className={'removeLinkFormatting boldText'} onClick={()=>{props.setSmallMenuOpen(false)}}>Dashboard</Link>
                    <hr className={styles.hrLink}></hr>
                    <Link href='/dashboard/instruments' className={'removeLinkFormatting boldText'} onClick={()=>{props.setSmallMenuOpen(false)}}>Instruments</Link>
                    <hr className={styles.hrLink}></hr>
                    <Link href='/dashboard/deployments' className={'removeLinkFormatting boldText'} onClick={()=>{props.setSmallMenuOpen(false)}}>Deployments</Link>
                    <hr className={styles.hrLink}></hr>
                    <Link href='/dashboard/data-models' className={'removeLinkFormatting boldText'} onClick={()=>{props.setSmallMenuOpen(false)}}>Data Models</Link>
                    <hr className={styles.hrLink}></hr>
                    <Link href='/dashboard/binary-map' className={'removeLinkFormatting boldText'} onClick={()=>{props.setSmallMenuOpen(false)}}>Binary Maps</Link>
                    <hr className={styles.hrLink}></hr>
                </div>
            </div>
        :''
        
    )
}

function AuthenticatedTopNav(props){
    const [smallMenuOpen, setSmallMenuOpen] = useState(false)
    
    return(
        <div className={[styles.topNavWrapper, props.publicPage?styles.unauthenticated:''].join(' ')}>
            <div className={styles.topNavLeftGroup}>
                <div className={''} style={{position: 'relative', border: '0px solid pink', display: 'flex', alignItems: 'center'}}>
                    <Link href='/dashboard/overview'>
                        <Image src={logo} className={[styles.topNavLogo, 'hideOnSmall'].join(' ')} priority={true} alt="Logo" />
                    </Link>
                    <div className='showOnSmall flex' >
                        <MenuIcon style={{color: 'var(--dark-theme-text-main)'}}  onClick={()=>{setSmallMenuOpen(!smallMenuOpen)}}/>
                    </div>
                    <SearchBar displayClass={'hideOnSmall'} grow={true}/>
                    <SmallMenu smallMenuOpen={smallMenuOpen} setSmallMenuOpen={setSmallMenuOpen}/>
                </div>
                <div>
            </div>
            </div>
            <Image src={logo} className={[styles.topNavLogo, 'showOnSmall'].join(' ')} alt="User profile picture" />
            <div className={styles.topNavRightGroup}>
                <div className='hideOnSmall' style={{paddingTop: '5px'}}>
                    <NotificationsNoneIcon style={{color: 'var(--dark-theme-text-main)'}}/>
                </div>
                <div className='hideOnSmall'>
                    <AddDropDown style={{color: 'var(--dark-theme-text-main)'}}/>
                </div>
                <AvatarDropDown user={props.user}/>
            </div>
        </div>
    )
}

function UnauthenticatedTopNav(props){
    return(
        <div className={[styles.topNavWrapper, styles.unauthenticated].join(' ')}>
            <div className={styles.topNavLeftGroup}>
                <div className={''} style={{position: 'relative', border: '0px solid pink', display: 'flex', alignItems: 'center'}}>
                    <Link href='/'>
                        <Image src={logo} className={[styles.topNavLogo, 'hideOnSmall'].join(' ')} alt="Logo" />
                    </Link>
                    <div className='showOnSmall flex' >
                        <MenuIcon style={{color: 'var(--dark-theme-text-main)'}}  onClick={()=>{setSmallMenuOpen(!smallMenuOpen)}}/>
                    </div>
                </div>
                <div>
                </div>
            </div>
            <Link className='greyButton' href={'/login'}>Login</Link>
        </div>
    )
}



            

export default function TopNav(props){

    const router = useRouter()
    const publicRoutes = ['/', '/login', '/learn']

    let publicPage
    if(router.isReady){
        publicPage = publicRoutes.includes(router.pathname)?true:false
    }

   return(
    props.user.loading?<div></div>:props.user.user?<AuthenticatedTopNav user={props.user.user} publicPage={publicPage}/>:<UnauthenticatedTopNav />
   )
}