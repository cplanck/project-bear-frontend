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


export default function TopNavUnauthenticated(props){


    return(
        <div className={[styles.topNavWrapper, styles.unauthenticated].join(' ')}>
            <div className={styles.topNavLeftGroup}>
                <div className={''} style={{position: 'relative', border: '0px solid pink', display: 'flex', alignItems: 'center'}}>
                    <Link href='/dashboard/overview'>
                        <Image src={logo} className={[styles.topNavLogo, 'hideOnSmall'].join(' ')} alt="User profile picture" />
                    </Link>
                </div>
                    <Link className='removeLinkFormatting me-3' href={'/product'}>Product</Link>
                    <Link className='removeLinkFormatting' href={'/product'}>Learn</Link>
                <div>
                    
                </div>
            </div>
            <div>
            <Link className='removeLinkFormatting greyButton' href={'/login'}>Login</Link>

            </div>
            
        </div>
    )
}