import * as React from 'react';
import Stack from '@mui/material/Stack';
// import CircularProgress from '@mui/material/CircularProgress';
import { ThreeDots } from  'react-loader-spinner'

export default function PagePreloader(){
    return(
        <div className='pagePreloaderWrapper'>
            <ThreeDots  height = '80' width='80' color="var(--dark-theme-grey-4)" />     
        </div>
    )
}


